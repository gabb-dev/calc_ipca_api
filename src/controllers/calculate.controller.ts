import type { Request, Response } from "express";
import type { IBankCentralProvider } from "../common/interfaces/bankCentralProvider.interface.js";
import type { ResponseBankCentral } from "../common/types/responseBankCentral.js";
import { ExternalServiceError } from "../common/errors/ExternalServiceError.error.js";
import type { ICalculateController } from "../common/interfaces/calculateController.interface.js";

export class CalculateController implements ICalculateController {
  constructor(private readonly conectorBankCentral: IBankCentralProvider) {}

  async getResult(req: Request, res: Response): Promise<Response> {
    const dates = req.query;

    const bank: ResponseBankCentral | ExternalServiceError =
      await this.conectorBankCentral.getDataApiBank(
        dates.startDate as string,
        dates.endDate as string,
      );

    if (bank instanceof ExternalServiceError)
      return res.json({
        error: bank.errorName,
        message: bank.message,
        statusCode: bank.statusCode,
      });

    return res.json({ value: this.conectorBankCentral.getPorcentagem });
  }

  //private calculate(porcentage: Decimal): Decimal {}
}
