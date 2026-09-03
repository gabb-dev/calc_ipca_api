import type { Request, Response, NextFunction } from "express";
import type { IMiddleware } from "../common/interfaces/middleware.interface.js";
import { BadRequestError } from "../common/errors/BadRequestError.error.js";
import { Decimal } from "decimal.js";

export class VerifyValueMiddleware {
  static verify(req: Request, res: Response, next: NextFunction): void {
    const value = req.query.value as string;

    try {
      if (!value || typeof value !== "string") {
        throw new BadRequestError("Valor não informado, favor informe o valor");
      }

      if (isNaN(Number(value)) && value.trim() !== "") {
        throw new BadRequestError(
          "Valor inválido, somente números são válidos",
        );
      }
    } catch (e) {
      if (e instanceof BadRequestError) {
        res.status(e.statusCode ?? 400).json({
          error: e.errorName,
          message: e.message,
        });
        return;
      }
      next(e);
    }
    const valueConvert = new Decimal(req.query.value as string);
    (req.query as any).value = valueConvert;
    next();
  }
}

VerifyValueMiddleware satisfies IMiddleware;
