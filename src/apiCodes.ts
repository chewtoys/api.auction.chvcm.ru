/**
 * API codes
 */
export enum ApiCodes {
  // default
  BAD_REQUEST = "BAD_REQUEST",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  PAYLOAD_TOO_LARGE = "PAYLOAD_TOO_LARGE",
  UNKNOWN_CODE = "UNKNOWN_CODE",
  UNSUPPORTED_MEDIA_TYPE = "UNSUPPORTED_MEDIA_TYPE",
  // custom
  ATTACHMENT_NOT_FOUND = "ATTACHMENT_NOT_FOUND",
  BANNED = "BANNED",
  DB_ENTITY_FOUND_BY_ITN = "DB_ENTITY_FOUND_BY_ITN",
  DB_ENTITY_FOUND_BY_ITN_AND_PSRN = "DB_ENTITY_FOUND_BY_ITN_AND_PSRN",
  DB_ENTITY_FOUND_BY_PSRN = "DB_ENTITY_FOUND_BY_PSRN",
  DB_ENTITY_NOT_FOUND_BY_ID = "DB_ENTITY_NOT_FOUND_BY_ID",
  DB_STUFF_NOT_FOUND_BY_ID = "DB_STUFF_NOT_FOUND_BY_ID",
  DB_TOKENS_TFA_RECOVERY_NOT_FOUND = "DB_TOKENS_TFA_RECOVERY_NOT_FOUND",
  DB_USER_FOUND_BY_EMAIL = "DB_USER_FOUND_BY_EMAIL",
  DB_USER_FOUND_BY_EMAIL_AND_PHONE = "DB_USER_FOUND_BY_EMAIL_AND_PHONE",
  DB_USER_FOUND_BY_PHONE = "DB_USER_FOUND_BY_PHONE",
  DB_USER_NOT_FOUND = "DB_USER_NOT_FOUND",
  DB_USER_NOT_FOUND_BY_EMAIL = "DB_USER_NOT_FOUND_BY_EMAIL",
  DB_USER_NOT_FOUND_BY_PASSWORD_RESET_TOKEN = "DB_USER_NOT_FOUND_BY_PASSWORD_RESET_TOKEN",
  DB_USER_NOT_FOUND_BY_PURGATORY_TOKEN = "DB_USER_NOT_FOUND_BY_PURGATORY_TOKEN",
  EMPLOYEE_NOT_FOUND_BY_ID = "DB_EMPLOYEE_NOT_FOUND_BY_ID",
  JWT_VERIFY_USER = "JWT_VERIFY_USER",
  OTP_WRONG_TOKEN = "OTP_WRONG_TOKEN",
  RECAPTCHA_V2 = "RECAPTCHA_V2",
  REQUIRED_ADMIN = "REQUIRED_ADMIN",
  REQUIRED_MODERATOR = "REQUIRED_MODERATOR",
  REQUIRED_SAME_ENTITY_OR_MODERATOR = "REQUIRED_SAME_ENTITY_OR_MODERATOR",
  REQUIRED_VERIFIED_ENTITY = "REQUIRED_VERIFIED_ENTITY",
}
