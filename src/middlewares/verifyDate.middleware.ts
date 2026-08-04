import type { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../common/errors/BadRequestError.error.js";

export class VerifyDateMiddleware {
  static verify(req: Request, res: Response, next: NextFunction) {
    const regexDate = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    const dates = req.query;

    if (req.method != "GET") next();

    try {
      if (!dates.startDate || !dates.endDate) {
        throw new BadRequestError(
          "Datas não existem. É necessário enviar tanto a data inicial quanto a data final",
          400,
        );
      }

      if (
        typeof dates.startDate !== "string" ||
        typeof dates.endDate !== "string"
      ) {
        throw new BadRequestError(
          "Tipo das datas incorretos. Verifique se são strings",
          400,
        );
      }

      if (
        regexDate.test(dates.startDate as string) ||
        regexDate.test(dates.endDate as string)
      ) {
        throw new BadRequestError(
          "Formato das datas inválido. Use DD/MM/YYYY",
          400,
        );
      }
    } catch (error) {
      if (error instanceof BadRequestError) {
        res.status(error.statusCode);
        res.json({
          message: error.message,
          statusCode: error.statusCode,
        });

        return;
      }
    }

    next();
  }
}
