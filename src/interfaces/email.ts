import * as nodemailer from "nodemailer";

/**
 * "EmailOptions" interface from type definitions for node-email-templates 3.5
 * TODO: this interface should be exported in @types/email-templates
 */
export interface IEmailOptions {
  locals: any;
  message: nodemailer.SendMailOptions;
  template: string;
}

export interface IEmailUser {
  email?: string;
  language?: string;
  name?: string;
}
