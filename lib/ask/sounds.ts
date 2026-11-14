/**
 * The page's sounds, synthesised on the spot so there's nothing to download.
 * Each one is a single short tone, quiet enough to sit under a room's noise.
 */
export type Sound = "tap" | "send" | "arrive" | "done" | "error";

type Note = {
  /** Hz at the start and end of the note; a glide when they differ. */
  from: number;
  to?: number;
  /** Seconds after the sound starts. */
  at?: number;
  duration: number;
  type?: OscillatorType;
  /** 0 to 1, before the master volume. */
  level?: number;
};

const SOUNDS: Record<Sound, Note[]> = {
  // A fingertip on a key
  tap: [{ from: 880, duration: 0.03, level: 0.5 }],
  // Lifts off, like something sent on its way
  send: [{ from: 420, to: 840, duration: 0.11, type: "triangle" }],
  // The first word landing
  arrive: [{ from: 300, to: 240, duration: 0.07, level: 0.8 }],
  // Two soft steps up: finished
  done: [
    { from: 660, duration: 0.09, level: 0.6 },
    { from: 880, at: 0.08, duration: 0.14, level: 0.6 },
  ],
  // One step down: something went wrong
  error: [
    { from: 300, duration: 0.1, type: "triangle" },
    { from: 220, at: 0.09, duration: 0.16, type: "triangle" },
  ],
};

const MASTER_VOLUME = 0.06;
const STORAGE_KEY = "ask-sound";

let context: AudioContext | null = null;

export function readSoundPreference() {
  try {
    return localStorage.getItem(STORAGE_KEY) !== "off";
  } catch {
    return true;
  }
}

export function saveSoundPreference(isOn: boolean) {
  try {
    localStorage.setItem(STORAGE_KEY, isOn ? "on" : "off");
  } catch {}
}

export function playSound(sound: Sound) {
  // Browsers only allow audio after the visitor has interacted with the page.
  // Every sound here follows a click or a key press, or an answer to one.
  context ??= new AudioContext();
  if (context.state === "suspended") void context.resume();

  const start = context.currentTime;

  for (const note of SOUNDS[sound]) {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const begin = start + (note.at ?? 0);
    const end = begin + note.duration;
    const peak = MASTER_VOLUME * (note.level ?? 1);

    oscillator.type = note.type ?? "sine";
    oscillator.frequency.setValueAtTime(note.from, begin);
    if (note.to) {
      oscillator.frequency.exponentialRampToValueAtTime(note.to, end);
    }

    // A quick swell and a longer fade, so no note starts or stops with a click
    gain.gain.setValueAtTime(0.0001, begin);
    gain.gain.exponentialRampToValueAtTime(peak, begin + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, end);

    oscillator.connect(gain).connect(context.destination);
    oscillator.start(begin);
    oscillator.stop(end + 0.02);
  }
}
