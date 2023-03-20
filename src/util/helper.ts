import {
  PASSWORD_MIN_LENHT,
  EMAIL_ADDR_PATTERN,
  NAME_MIN_LENGTH,
  NAME_MAX_LENGTH,
} from "./data";

export const emailIsValid = (emailAddress: string) =>
  EMAIL_ADDR_PATTERN.test(emailAddress);

export const contactIsValid = (contact: string) =>
  contact.length === 11 && contact.startsWith("0") && /^[0-9]+$/.test(contact);

export const passwordIsValid = (password: string) =>
  password.length >= PASSWORD_MIN_LENHT;

export const nameIsValid = (name: string) =>
  name.length >= NAME_MIN_LENGTH && name.length <= NAME_MAX_LENGTH;
