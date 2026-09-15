import type { Decimal } from "decimal.js";
import type { ExternalServiceError } from "../errors/ExternalServiceError.error.js";
import type { ResponseBankCentralDto } from "../../dtos/responseBankCentral.dto.js";

export interface IBankCentralProvider {
  getDataApiBank(
    startDate: string,
    endDate: string,
  ): Promise<ResponseBankCentralDto[] | ExternalServiceError>;
  get getPorcentagem(): Decimal;
  get getPercentual(): string;
}
