import type { Decimal } from "decimal.js";
import type { ResponseBankCentral } from "../types/responseBankCentral.js";
import type { ExternalServiceError } from "../errors/ExternalServiceError.error.js";

export interface IBankCentralProvider {
  getDataApiBank(
    startDate: string,
    endDate: string,
  ): Promise<ResponseBankCentral | ExternalServiceError>;
  get getPorcentagem(): Decimal;
}
