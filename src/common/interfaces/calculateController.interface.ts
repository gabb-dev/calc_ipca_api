import type { Request, Response } from "express";

export interface ICalculateController {
  getResult(req: Request, res: Response): Promise<Response>;
}
