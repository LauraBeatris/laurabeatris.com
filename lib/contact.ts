/** Shared by the composer and the route that delivers what it writes. */
export const CONTACT_EMAIL = "contato@laurabeatris.com";

export const MAX_EMAIL_LENGTH = 254;
export const MAX_SUBJECT_LENGTH = 150;
export const MAX_MESSAGE_LENGTH = 5000;

/** Loose on purpose: one @, a dot after it, no spaces. The inbox is the real test. */
export function isEmailAddress(value: string) {
  return (
    value.length <= MAX_EMAIL_LENGTH && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  );
}
