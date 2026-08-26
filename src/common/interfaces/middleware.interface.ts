import type { NextFunction, Request, Response } from "express";

export interface IMiddleware {
  verify(req: Request, res: Response, next: NextFunction): void;
}
