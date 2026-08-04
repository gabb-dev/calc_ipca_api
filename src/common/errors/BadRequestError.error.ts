export class BadRequestError extends Error {
  statusCode: number;
  errorName: string;

  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.statusCode = statusCode;
    this.errorName = "BadRequest";
  }
}
