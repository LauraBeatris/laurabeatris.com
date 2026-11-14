"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import type { FormEvent, KeyboardEvent, PointerEvent, ReactNode } from "react";
import { createPortal } from "react-dom";
import { SendButton, type SendStatus } from "@/components/send-button";
import {
  CONTACT_EMAIL,
  MAX_EMAIL_LENGTH,
  MAX_MESSAGE_LENGTH,
  MAX_SUBJECT_LENGTH,
  hasText,
  isEmailAddress,
} from "@/lib/contact";

/** How long "Email sent" stays up before the composer puts itself away. */
const SENT_LINGER_MS = 1400;
/** The composer's exit, so the form only empties once it's out of sight. */
const EXIT_MS = 160;

const MAILTO = `mailto:${CONTACT_EMAIL}`;

/** Where the composer is a sheet from the bottom edge instead of a popover. Matches the stylesheet. */
const SHEET =
  "(max-width: 639.98px), (pointer: coarse) and (max-height: 520px)";
/** How far the sheet has to be pulled down, or how fast in px/ms, before it lets go. */
const DISMISS_DISTANCE = 96;
const DISMISS_VELOCITY = 0.5;
/** A finger held still this long before letting go has stopped flicking. */
const FLICK_STALE_MS = 80;

export function EmailMe() {
  const [isOpen, setIsOpen] = useState(false);
  // Where the composer mounts. It only joins the page once someone asks for it
  const [anchor, setAnchor] = useState<Element | null>(null);
  const [status, setStatus] = useState<SendStatus>("idle");
  const [error, setError] = useState<ReactNode>(null);

  const composerId = useId();
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const closing = useRef<ReturnType<typeof setTimeout>>(undefined);
  const drag = useRef<{
    startY: number;
    lastY: number;
    lastAt: number;
    velocity: number;
  } | null>(null);

  useEffect(() => () => clearTimeout(closing.current), []);

  // As a sheet it sits on the keyboard, so it follows the part of the page still
  // visible. It keeps following while it leaves, since the keyboard drops after it
  useEffect(() => {
    const viewport = window.visualViewport;
    const sheet = panel.current;
    if (!viewport || !sheet) return;

    function follow() {
      if (!viewport || !sheet) return;
      const covered = window.innerHeight - viewport.height - viewport.offsetTop;
      sheet.style.setProperty(
        "--keyboard-inset",
        `${Math.max(0, Math.round(covered))}px`,
      );
      sheet.style.setProperty(
        "--visible-height",
        `${Math.round(viewport.height)}px`,
      );
    }

    follow();
    viewport.addEventListener("resize", follow);
    viewport.addEventListener("scroll", follow);
    return () => {
      viewport.removeEventListener("resize", follow);
      viewport.removeEventListener("scroll", follow);
    };
  }, [anchor]);

  // It grows out of "Email me", wherever that sits along the row
  useLayoutEffect(() => {
    if (!isOpen || !panel.current || !trigger.current) return;

    const link = trigger.current.getBoundingClientRect();
    const left = panel.current.getBoundingClientRect().left;
    panel.current.style.transformOrigin = `${link.left + link.width / 2 - left}px 100%`;
  }, [isOpen, anchor]);

  useEffect(() => {
    if (!isOpen) return;

    const fields = form.current?.elements;
    const from = fields?.namedItem("from") as HTMLInputElement | null;
    const message = fields?.namedItem("message") as HTMLTextAreaElement | null;

    // As a sheet, a focused field throws the keyboard up while it's still rising.
    // Focus the sheet instead, and let the first tap pick the field
    if (window.matchMedia(SHEET).matches) {
      panel.current?.focus({ preventScroll: true });
      return;
    }

    // Pick up where the draft left off
    (from?.value ? message : from)?.focus({ preventScroll: true });
  }, [isOpen]);

  function open() {
    clearTimeout(closing.current);
    // It floats over the footer's row, so it lines up with the page's column
    setAnchor(trigger.current?.closest("[data-composer-anchor]") ?? null);
    setIsOpen(true);
  }

  function close({ thenReset = false } = {}) {
    setIsOpen(false);
    // Hand focus back, unless the reader has already moved on down the page
    if (panel.current?.contains(document.activeElement)) {
      trigger.current?.focus({ preventScroll: true });
    }

    if (!thenReset) return;
    closing.current = setTimeout(() => {
      form.current?.reset();
      setStatus("idle");
    }, EXIT_MS);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") close();
    // Safari ends an IME composition with an Enter that isn't flagged as composing,
    // only as key 229, so both are checked before Return does anything
    const isComposing = event.nativeEvent.isComposing || event.keyCode === 229;
    if (event.key !== "Enter" || isComposing) return;

    if (event.metaKey || event.ctrlKey) {
      event.preventDefault();
      form.current?.requestSubmit();
      return;
    }

    // Return in a one-line field moves on, like the keyboard's "next" key says,
    // instead of sending a half-written email
    if (event.target instanceof HTMLInputElement) {
      event.preventDefault();
      const order = ["from", "subject", "message"];
      const next = order[order.indexOf(event.target.name) + 1];
      (form.current?.elements.namedItem(next) as HTMLElement | null)?.focus();
    }
  }

  // Pulling the sheet down by its header puts it away, like a native sheet
  function handleDragStart(event: PointerEvent<HTMLDivElement>) {
    const isSheet = window.matchMedia(SHEET).matches;
    if (event.pointerType === "mouse" || !isSheet) return;
    if ((event.target as Element).closest("button, a")) return;

    drag.current = {
      startY: event.clientY,
      lastY: event.clientY,
      lastAt: event.timeStamp,
      velocity: 0,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handleDragMove(event: PointerEvent<HTMLDivElement>) {
    const current = drag.current;
    if (!current || !panel.current) return;

    const elapsed = event.timeStamp - current.lastAt;
    if (elapsed > 0) {
      current.velocity = (event.clientY - current.lastY) / elapsed;
    }
    current.lastY = event.clientY;
    current.lastAt = event.timeStamp;

    // Only once it moves, so a tap on the header doesn't stop the sheet mid-rise
    panel.current.style.transition = "none";
    // Down it follows the finger; up it only gives a little, as if it's already as tall as it goes
    const pulled = event.clientY - current.startY;
    const offset = pulled >= 0 ? pulled : -8 * Math.log1p(-pulled / 8);
    panel.current.style.transform = `translateY(${offset}px)`;
  }

  function handleDragEnd(event: PointerEvent<HTMLDivElement>) {
    const current = drag.current;
    drag.current = null;
    if (!current || !panel.current) return;

    // Hands the sheet back to the stylesheet, which carries it on from where the finger left it
    panel.current.style.transition = "";
    panel.current.style.transform = "";

    const pulled = event.clientY - current.startY;
    const isFresh = event.timeStamp - current.lastAt < FLICK_STALE_MS;
    const flicked = pulled > 16 && isFresh && current.velocity > DISMISS_VELOCITY;
    const shouldDismiss = pulled > DISMISS_DISTANCE || flicked;
    if (event.type === "pointerup" && shouldDismiss) close();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending" || status === "sent") return;

    const fields = event.currentTarget.elements;
    const from = fields.namedItem("from") as HTMLInputElement;
    const message = fields.namedItem("message") as HTMLTextAreaElement;
    const draft = Object.fromEntries(new FormData(event.currentTarget));

    if (!isEmailAddress(from.value.trim())) {
      setError("Add your email so I can write back.");
      from.focus();
      return;
    }

    if (!hasText(message.value)) {
      setError("Write a message first.");
      message.focus();
      return;
    }

    setError(null);
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });

      // Too many emails, or a field the server didn't like: it says which
      if (response.status === 400 || response.status === 429) {
        const answer: { error?: string } = await response.json();
        setStatus("failed");
        setError(answer.error ?? "That didn't go through.");
        return;
      }

      if (!response.ok) throw new Error(`The email form answered ${response.status}`);
      setStatus("sent");
    } catch {
      setStatus("failed");
      setError(
        <>
          That didn&apos;t go through. Try again, or use{" "}
          <a href={MAILTO} className="underline underline-offset-2">
            your mail app
          </a>
          .
        </>,
      );
    }
  }

  const isLocked = status === "sending" || status === "sent";

  return (
    <>
      <button
        ref={trigger}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={anchor ? composerId : undefined}
        data-open={isOpen}
        onClick={() => (isOpen ? close() : open())}
        className="mail-trigger -my-2.5 inline-flex items-center gap-1.5 rounded-sm py-2.5 text-sm text-muted outline-none transition-colors hover:text-foreground active:text-foreground focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background aria-expanded:text-foreground"
      >
        <MailIcon />
        {/* The words, not the icon, set the baseline the other links line up on */}
        <span className="self-baseline">Email me</span>
      </button>

      {anchor &&
        createPortal(
          <>
            {/* Only drawn as a sheet, to dim the page behind it. Tapping it puts the sheet away */}
            <div
              aria-hidden="true"
              data-open={isOpen}
              onClick={() => close()}
              className="composer-backdrop"
            />
            <div
              ref={panel}
              id={composerId}
              role="dialog"
              aria-label="Email Laura"
              tabIndex={-1}
              data-open={isOpen}
              inert={!isOpen}
              onKeyDown={handleKeyDown}
              className="composer absolute bottom-[calc(100%-1.25rem)] right-0 z-50 flex max-h-[calc(100dvh-7rem)] w-full flex-col rounded-2xl border border-border bg-background outline-none sm:w-[24rem]"
            >
              <div
                onPointerDown={handleDragStart}
                onPointerMove={handleDragMove}
                onPointerUp={handleDragEnd}
                onPointerCancel={handleDragEnd}
                className="composer-header relative flex h-12 shrink-0 items-center justify-between pl-4 pr-2"
              >
                <span aria-hidden="true" className="composer-grabber" />
                <h2 className="text-sm font-medium">New message</h2>
                <button
                  type="button"
                  onClick={() => close()}
                  aria-label="Close"
                  className="inline-flex size-8 items-center justify-center rounded-full text-muted outline-none transition-[color,transform] duration-[160ms] ease-[var(--ease-out)] hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent active:scale-95 motion-reduce:active:scale-100"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M3 3l8 8M11 3l-8 8" />
                  </svg>
                </button>
              </div>

              <form
                ref={form}
                noValidate
                aria-busy={status === "sending"}
                onSubmit={handleSubmit}
                className="flex min-h-0 flex-1 flex-col"
              >
                <div
                  data-locked={isLocked}
                  className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain transition-opacity duration-200 data-[locked=true]:opacity-50"
                >
                  <Row label="To" as="div">
                    <a
                      href={MAILTO}
                      className="truncate font-mono text-[13px] outline-none focus-visible:underline"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </Row>
                  <Row label="From">
                    <input
                      name="from"
                      readOnly={isLocked}
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      autoCapitalize="off"
                      autoCorrect="off"
                      enterKeyHint="next"
                      spellCheck={false}
                      maxLength={MAX_EMAIL_LENGTH}
                      placeholder="you@example.com"
                      className={FIELD}
                    />
                  </Row>
                  <Row label="Subject">
                    <input
                      name="subject"
                      readOnly={isLocked}
                      type="text"
                      autoComplete="off"
                      enterKeyHint="next"
                      maxLength={MAX_SUBJECT_LENGTH}
                      placeholder="Optional"
                      className={FIELD}
                    />
                  </Row>
                  <textarea
                    name="message"
                    readOnly={isLocked}
                    aria-label="Message"
                    rows={6}
                    maxLength={MAX_MESSAGE_LENGTH}
                    placeholder="What's on your mind?"
                    className={`${FIELD} composer-message min-h-24 resize-none overscroll-contain border-t border-border px-4 py-3 leading-relaxed`}
                  />
                  {/* Nobody sees this one. Whatever fills it in isn't a person. */}
                  <input
                    name="fax"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="sr-only"
                  />
                </div>

                <div className="flex shrink-0 items-center justify-between gap-3 py-3 pl-4 pr-2">
                  {error ? (
                    <p
                      role="alert"
                      className="min-w-0 text-pretty text-[13px] leading-snug text-muted"
                    >
                      {error}
                    </p>
                  ) : (
                    <SendHint />
                  )}
                  <SendButton
                    status={status}
                    onSent={() => {
                      closing.current = setTimeout(
                        () => close({ thenReset: true }),
                        SENT_LINGER_MS,
                      );
                    }}
                  />
                </div>

                <p aria-live="polite" className="sr-only">
                  {status === "sending" && "Sending your email"}
                  {status === "sent" && "Email sent"}
                </p>
              </form>
            </div>
          </>,
          anchor,
        )}
    </>
  );
}

const FIELD =
  "min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted placeholder:opacity-60 sm:text-sm";

function Row({
  label,
  as: Tag = "label",
  children,
}: {
  label: string;
  as?: "label" | "div";
  children: ReactNode;
}) {
  return (
    <Tag className="composer-row flex h-11 shrink-0 items-center gap-3 border-t border-border px-4">
      <span className="w-14 shrink-0 text-sm text-muted">{label}</span>
      {children}
    </Tag>
  );
}

/** Rendered with the composer, which only exists in the browser. */
function SendHint() {
  const isApple = /Mac|iPhone|iPad/.test(navigator.platform);

  return (
    <p
      aria-hidden="true"
      className="hidden items-center gap-1 font-mono text-xs text-muted [@media(hover:hover)_and_(pointer:fine)]:flex"
    >
      <Key>
        {isApple ? (
          <KeyGlyph d="M9 9V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V9Z" />
        ) : (
          "Ctrl"
        )}
      </Key>
      <Key>
        <KeyGlyph d="M20 5v6a4 4 0 0 1-4 4H5M9 10.5 4.5 15 9 19.5" />
      </Key>
      <span className="ml-1">to send</span>
    </p>
  );
}

/**
 * A keycap. The symbols on it are drawn here: as text they fall back to
 * whatever font has them, each at its own size and height.
 */
function Key({ children }: { children: ReactNode }) {
  return (
    <kbd className="inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-[5px] border border-border px-[3px] font-sans text-[10px] font-medium leading-none">
      {children}
    </kbd>
  );
}

function KeyGlyph({ d }: { d: string }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={d} />
    </svg>
  );
}

/** A sealed envelope. Hovering lifts the flap and lets the heart out. */
function MailIcon() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="14"
      viewBox="0 0 18 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="overflow-visible"
    >
      <rect x="0.7" y="0.7" width="16.6" height="12.6" rx="2.6" />
      {/* The pocket's edge, and the flap that lies along it until it lifts */}
      <path d="M1.6 2.2L9 7.6L16.4 2.2" />
      <path d="M1.6 2.2L9 7.6L16.4 2.2" className="mail-flap" />
      <g transform="translate(9 7.7)">
        <path
          d="M0 1.9C-1.9 0.5-2.4-0.3-2.4-0.9C-2.4-1.6-1.9-2-1.3-2C-0.8-2-0.3-1.7 0-1.2C0.3-1.7 0.8-2 1.3-2C1.9-2 2.4-1.6 2.4-0.9C2.4-0.3 1.9 0.5 0 1.9Z"
          fill="currentColor"
          stroke="hsl(var(--background))"
          strokeWidth="1.2"
          paintOrder="stroke"
          className="mail-heart"
        />
      </g>
    </svg>
  );
}
