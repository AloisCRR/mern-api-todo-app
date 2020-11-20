import { getReasonPhrase, StatusCodes } from "http-status-codes";

export class HttpException extends Error {
  code: StatusCodes;
  validationErrors?: object;

  constructor(
    message: string = getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
    code: StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR,
    validationErrors?: object
  ) {
    super(message);
    this.code = code;
    this.validationErrors = validationErrors;
  }
}
