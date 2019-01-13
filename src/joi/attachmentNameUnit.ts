import {RegExpUnit} from "@alendo/express-req-validator";

/**
 * Attachment name validation unit
 */
export class AttachmentNameUnit extends RegExpUnit {
  /**
   * Attachment name validation unit constructor
   * @param value Value for validate
   */
  public constructor(value: any) {
    super(value, /^[a-zA-Zа-яА-Я0-9_\-]([a-zA-Zа-яА-Я0-9_\- ]*(\.\w+)?)*\.\w+$/);
  }
}
