export const Error = class {
  statusCode: number;
  errorCode: string;
  message: string;
  detail: string;

  constructor(
    statusCode: number,
    errorCode: string,
    message: string,
    detail: string = message
  ) {
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.message = message;
    this.detail = detail;
  }
};
