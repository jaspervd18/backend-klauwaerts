type HttpCode = 400 | 401 | 404 | 409 | 500;

export class AppError extends Error {
  public readonly httpCode: HttpCode;

  constructor(httpCode: HttpCode, message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.httpCode = httpCode;
    Error.captureStackTrace(this);
  }
}
