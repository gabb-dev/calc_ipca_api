import { Decimal } from "decimal.js";
import type { BankCentralProvider } from "../providers/bankCentral.provider.js";
import type { ResponseBankCentral } from "../common/types/responseBankCentral.js";
import { ExternalServiceError } from "../common/errors/ExternalServiceError.error.js";

export class CalculateService {
  constructor(private readonly bankCentralProvide: BankCentralProvider) {}

  calculate(value: Decimal): Decimal {}

  private async getBankData(startDate: string, endDate: string) {
    const responseBank: ResponseBankCentral | ExternalServiceError =
      await this.bankCentralProvide.getDataApiBank(startDate, endDate);

    if (responseBank instanceof ExternalServiceError) {
      return responseBank;
    }
  }
}
