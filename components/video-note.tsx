"use client";

/**
 * A round video note, like a voice message with a face. The ring around it is
 * a pen stroke that draws itself as the video plays (drag it to seek), the
 * captions are set as text beside it, and if you scroll away while it plays it
 * docks in the corner so you can keep reading while you listen.
 *
 * Playback state comes from Video.js; the UI is all ours, so no skin CSS.
 */
import { Container, Hotkey, useActiveTextCues } from "@videojs/react";
import { usePlayer, Video, VideoPlayer } from "@videojs/react/video";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { Ink, penLine, TextButton, through } from "@/components/sketch";

type VideoNoteProps = {
  /** The video file, e.g. a Vercel Blob URL. Square works best. */
  src: string;
  poster?: string;
  /** A WebVTT file. Its cues are shown as text beside the video. */
  captions?: string;
  /** What the reader is about to hear. */
  title: string;
  /** Shown before the file's metadata loads, e.g. "0:24". */
  length?: string;
};

export function VideoNote(props: VideoNoteProps) {
  return (
    <VideoPlayer>
      <Note {...props} />
    </VideoPlayer>
  );
}

const RATES = [1, 1.5, 2];
const CAPTION_FILTER = { kind: "captions" } as const;

/** One turn, starting at twelve o'clock, with a slight hand-drawn wobble. */
const RING = through(
  Array.from({ length: 33 }, (_, i) => {
    const angle = -Math.PI / 2 + (i / 32) * Math.PI * 2;
    const radius = 46 * (1 + 0.012 * Math.sin(angle * 3 + 1) + 0.008 * Math.sin(angle * 5));

    return [50 + Math.cos(angle) * radius, 50 + Math.sin(angle) * radius] as const;
  }),
);
const PLAY = [through([[41, 36], [41, 64], [64, 50], [41, 36]])];
const CROSS = [penLine(8, 8, 16, 16, 5), penLine(16, 8, 8, 16, 6)];

function formatTime(seconds: number) {
  const whole = Math.max(0, Math.floor(seconds));

  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, "0")}`;
}

function Note({ src, poster, captions, title, length }: VideoNoteProps) {
  const store = usePlayer();
  const paused = usePlayer((s) => s.paused);
  const ended = usePlayer((s) => s.ended);
  const started = usePlayer((s) => s.started);
  const currentTime = usePlayer((s) => s.currentTime);
  const duration = usePlayer((s) => s.duration);
  const rate = usePlayer((s) => s.playbackRate);
  const [cue] = useActiveTextCues(CAPTION_FILTER);

  const slot = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [scrubbing, setScrubbing] = useState(false);
  const [active, setActive] = useState(false);
  const [inView, setInView] = useState(true);
  const [showCaptions, setShowCaptions] = useState(true);

  const docked = active && !inView;
  const progress = duration > 0 ? Math.min(1, currentTime / duration) : 0;
  const caption = showCaptions ? cue?.text : undefined;

  useEffect(() => {
    const element = slot.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (ended) setActive(false);
  }, [ended]);

  // Load the captions without letting the browser draw them over the circle:
  // a "hidden" track still fires its cues, which we set as text instead.
  useEffect(() => {
    const tracks = video.current?.textTracks;
    if (!tracks) return;

    const hide = () => {
      for (const track of tracks) {
        if (track.kind === "captions" && track.mode === "disabled") track.mode = "hidden";
      }
    };

    hide();
    tracks.addEventListener("addtrack", hide);

    return () => tracks.removeEventListener("addtrack", hide);
  }, []);

  function play() {
    setActive(true);
    store.setMuted(false);
    void store.play();
  }

  function toggle() {
    if (paused) play();
    else store.pause();
  }

  function stop() {
    store.pause();
    setActive(false);
  }

  function seekTo(event: PointerEvent<SVGPathElement>) {
    const box = event.currentTarget.ownerSVGElement!.getBoundingClientRect();
    const x = event.clientX - (box.left + box.width / 2);
    const y = event.clientY - (box.top + box.height / 2);
    const turn = (Math.atan2(y, x) + Math.PI / 2 + Math.PI * 2) % (Math.PI * 2);

    if (duration > 0) void store.seek((turn / (Math.PI * 2)) * duration);
  }

  return (
    <Container className="my-10 flex items-center gap-5 sm:gap-6">
      <Hotkey keys="k" action="togglePaused" />
      <Hotkey keys="ArrowLeft" action="seekStep" value={-5} />
      <Hotkey keys="ArrowRight" action="seekStep" value={5} />

      {/* Keeps the note's place in the text while the video itself is docked. */}
      <div ref={slot} className="relative size-[120px] shrink-0 sm:size-[136px]">
        <div
          className={
            docked
              ? "video-note-dock fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-40 size-[84px] sm:right-6 sm:size-[96px]"
              : "absolute inset-0"
          }
        >
          <div className="absolute inset-[7%] overflow-hidden rounded-full bg-border">
            <Video
              ref={video}
              src={src}
              poster={poster}
              preload="metadata"
              playsInline
              crossOrigin="anonymous"
              fallback={null}
              className="size-full object-cover"
            >
              {captions && <track kind="captions" src={captions} srcLang="en" label="English" />}
            </Video>
          </div>

          <button
            type="button"
            onClick={toggle}
            aria-label={paused ? `Play video note: ${title}` : "Pause video note"}
            className="absolute inset-[7%] rounded-full text-white transition-transform duration-150 [transition-timing-function:var(--ease-out)] active:scale-[0.97]"
          >
            {paused && (
              <svg viewBox="0 0 100 100" aria-hidden className="size-full drop-shadow">
                <Ink paths={PLAY} width={3.4} />
              </svg>
            )}
          </button>

          <svg viewBox="0 0 100 100" aria-hidden className="pointer-events-none absolute inset-0 size-full overflow-visible">
            <path d={RING} fill="none" stroke="hsl(var(--border))" strokeWidth={2.2} strokeLinecap="round" />
            <path
              d={RING}
              pathLength={1}
              fill="none"
              stroke="currentColor"
              strokeWidth={2.4}
              strokeLinecap="round"
              strokeDasharray="1 2"
              strokeDashoffset={1.001 - progress}
              className={scrubbing ? undefined : "transition-[stroke-dashoffset] duration-300 ease-linear"}
            />
            {/* A wide, invisible band over the ring: drag along it to seek. */}
            <path
              d={RING}
              fill="none"
              stroke="transparent"
              strokeWidth={14}
              className="cursor-pointer touch-none"
              style={{ pointerEvents: "stroke" }}
              onPointerDown={(event) => {
                event.currentTarget.setPointerCapture(event.pointerId);
                setScrubbing(true);
                seekTo(event);
              }}
              onPointerMove={(event) => scrubbing && seekTo(event)}
              onPointerUp={() => setScrubbing(false)}
              onPointerCancel={() => setScrubbing(false)}
            />
          </svg>

          {docked && (
            <>
              {caption && (
                <p
                  key={caption}
                  aria-hidden
                  className="video-note-bubble absolute bottom-1/2 right-full mr-3 w-max max-w-[min(260px,calc(100vw-140px))] translate-y-1/2 rounded-2xl border border-border bg-background px-3 py-2 text-pretty text-sm leading-snug shadow-sm"
                >
                  {caption}
                </p>
              )}
              <button
                type="button"
                onClick={stop}
                aria-label="Close video note"
                className="absolute -left-1 -top-1 grid size-6 place-items-center rounded-full border border-border bg-background text-foreground transition-transform duration-150 [transition-timing-function:var(--ease-out)] active:scale-[0.9]"
              >
                <svg viewBox="0 0 24 24" aria-hidden className="size-4">
                  <Ink paths={CROSS} width={1.8} />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>

      <div className="min-w-0 flex-1">
        {!started && (
          <>
            <p className="font-mono text-sm text-muted">
              Hear it from me{(duration > 0 || length) && ` · ${duration > 0 ? formatTime(duration) : length}`}
            </p>
            <p className="mt-1 text-pretty text-lg font-medium leading-snug">{title}</p>
            <div className="mt-2">
              <TextButton onClick={play}>play with sound</TextButton>
            </div>
          </>
        )}

        {started && ended && (
          <>
            <p className="text-pretty text-lg font-medium leading-snug">Thanks for listening.</p>
            <div className="mt-2">
              <TextButton onClick={play}>watch again</TextButton>
            </div>
          </>
        )}

        {started && !ended && (
          <>
            <p aria-live="polite" className="min-h-[3lh] text-pretty text-lg leading-snug">
              {caption ?? (showCaptions ? "" : <span className="text-muted">Captions are off.</span>)}
            </p>
            <div className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1 font-mono text-sm text-muted">
              <span className="tabular-nums">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
              <TextButton onClick={toggle}>{paused ? "play" : "pause"}</TextButton>
              <TextButton onClick={() => store.setPlaybackRate(RATES[(RATES.indexOf(rate) + 1) % RATES.length])}>
                {`${rate}x`}
              </TextButton>
              <TextButton onClick={() => setShowCaptions((on) => !on)}>
                {showCaptions ? "captions off" : "captions on"}
              </TextButton>
            </div>
          </>
        )}
      </div>
    </Container>
  );
}
