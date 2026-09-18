import type { Request, Response } from "express";
import type { IBankCentralProvider } from "../common/interfaces/bankCentralProvider.interface.js";
import { ExternalServiceError } from "../common/errors/ExternalServiceError.error.js";
import type { ICalculateController } from "../common/interfaces/calculateController.interface.js";
import type { ICalculateService } from "../common/interfaces/calculateService.interface.js";
import { Decimal } from "decimal.js";
import { AppError } from "../common/errors/AppError.error.js";
import type { ParamsDto } from "../dtos/params.dto.js";
import type { ResponseBankCentralDto } from "../dtos/responseBankCentral.dto.js";

export class CalculateController implements ICalculateController {
  constructor(
    private readonly conectorBankCentral: IBankCentralProvider,
    private readonly calculateService: ICalculateService,
  ) {}

  async getResult(req: Request, res: Response): Promise<Response> {
    try {
      const data: ParamsDto = req.query as unknown as ParamsDto;
      const value: Decimal = new Decimal(data.value);

      const bank: ResponseBankCentralDto[] | ExternalServiceError =
        await this.conectorBankCentral.getDataApiBank(
          data.startDate,
          data.endDate,
        );

      if (bank instanceof ExternalServiceError)
        return res.status(bank.statusCode).json({
          error: bank.errorName,
          message: bank.message,
          statusCode: bank.statusCode,
        });

      const valueCalculate: string = this.calculateService.calculate(
        value,
        this.conectorBankCentral.getPercentual,
      );

      return res.status(200).json({
        porcentage: this.conectorBankCentral.getPorcentagem,
        indexValue: this.conectorBankCentral.getPercentual,
        value: value,
        valueConverted: valueCalculate,
        statusCode: 200,
      });
    } catch (e) {
      const error: AppError = new AppError(
        "Erro interno do servidor. Favor tente novamente mais tarde",
        500,
      );

      return res.status(500).json({
        error: error.errorName,
        message: error.message,
        statusCode: error.statusCode,
      });
    }
  }
}
