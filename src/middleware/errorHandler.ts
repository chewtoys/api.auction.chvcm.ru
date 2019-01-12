import {NextFunction, Request, Response} from "express";
import * as createError from "http-errors";
import {ApiCodes} from "../apiCodes";

function getCodeForStatus(status: number): string {
  switch (status) {
    case 400:
      return ApiCodes.BAD_REQUEST;
    case 413:
      return ApiCodes.PAYLOAD_TOO_LARGE;
    case 415:
      return ApiCodes.UNSUPPORTED_MEDIA_TYPE;
    case 500:
      return ApiCodes.INTERNAL_SERVER_ERROR;
    default:
      return ApiCodes.UNKNOWN_CODE;
  }
}

export function errorHandler(error: createError.HttpError, req: Request, res: Response, next: NextFunction): void {
  if (!res.headersSent) {
    const status = error.statusCode || error.status || 500;
    const code = error.code || getCodeForStatus(status);
    res.status(status).json({
      code,
      message: error.message,
    });
  }
  next(error);
}
