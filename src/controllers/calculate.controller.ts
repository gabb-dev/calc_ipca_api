import type { Request, Response } from "express";

export class CalculateController {
  calculate(req: Request, res: Response) {
    const dates = req.query;

    return res.send(dates);
  }
}
