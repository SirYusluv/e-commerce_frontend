export const EMAIL_ADDR_PATTERN =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
export const PASSWORD_MIN_LENHT = 7;
export const NAME_MIN_LENGTH = 1;
export const NAME_MAX_LENGTH = 15;
export const ADDRESS_MIN_LENGTH = 2;

export const ACCESS_TOKEN = "access_token";

export const API_URL = "http://192.168.234.243:3000";
export const NAV_ITEMS = ["Home", "Items", "Contact Us"];

export const HTTP_STATUS = {
  ok: 200,
  created: 201,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  internalServerError: 500,
  conflict: 409,
};

export interface IUser {
  _v: number; // version: added by mongoose
  _id: string;
  emailAddress: string;
  firstName: string;
  lastName: string;
  isBlocked: boolean;
  accountType: string;
  createdBy: string;
  createdDate: string;
}
