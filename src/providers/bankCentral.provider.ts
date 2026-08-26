import { Axios } from "axios";
import { Decimal } from "decimal.js";
import type { IBankCentralProvider } from "../common/interfaces/bankCentralProvider.interface.js";
import type { ResponseBankCentral } from "../common/types/responseBankCentral.js";
import type { IConectorBankCentralService } from "../common/interfaces/conectorBankCentralService.interface.js";
import { ExternalServiceError } from "../common/errors/ExternalServiceError.error.js";

export class BankCentralProvider implements IBankCentralProvider {
  private porcentage: Decimal = new Decimal(0.0);

  constructor(
    private readonly conectorBankService: IConectorBankCentralService,
    private readonly axios: Axios = new Axios(),
  ) {}

  async getDataApiBank(
    startDate: string,
    endDate: string,
  ): Promise<ResponseBankCentral | ExternalServiceError> {
    try {
      const resAxios: any = await this.axios.get(
        process.env.URL_BANK as string,
        {
          params: {
            dataInicial: startDate,
            dataFinal: endDate,
          },
        },
      );
      const resAxiosJson: ResponseBankCentral = JSON.parse(resAxios.data);
      this.porcentage =
        this.conectorBankService.getPorcentageIPCA(resAxiosJson);
      return resAxiosJson;
    } catch (e) {
      return new ExternalServiceError(
        "Serviço do banco central indisponível no momento, tente novamente mais tarde",
        500,
      );
    }
  }

  get getPorcentagem(): Decimal {
    return this.porcentage;
  }
}
