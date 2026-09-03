export class AppError extends Error {
  statusCode: number;
  errorName: string;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.errorName = "ServerError";
  }
}
