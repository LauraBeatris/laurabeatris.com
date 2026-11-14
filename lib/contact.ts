/** Shared by the composer and the route that delivers what it writes. */
export const CONTACT_EMAIL = "contato@laurabeatris.com";

export const MAX_EMAIL_LENGTH = 254;
export const MAX_SUBJECT_LENGTH = 150;
export const MAX_MESSAGE_LENGTH = 5000;

// One @, a dot after it, and none of the characters that separate addresses or
// wrap names in a mail header. Whether it's a real inbox, only a reply can tell.
const ADDRESS_PART = String.raw`[^\s@<>()[\]\\,;:"\p{C}]+`;
const EMAIL_ADDRESS = new RegExp(
  `^${ADDRESS_PART}@${ADDRESS_PART}\\.${ADDRESS_PART}$`,
  "u",
);

export function isEmailAddress(value: string) {
  return value.length <= MAX_EMAIL_LENGTH && EMAIL_ADDRESS.test(value);
}

/** True when there's something to read, not only spaces or invisible characters. */
export function hasText(value: string) {
  return /[^\s\p{Z}\p{C}]/u.test(value);
}
