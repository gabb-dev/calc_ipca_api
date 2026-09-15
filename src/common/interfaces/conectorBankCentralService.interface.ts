import { Decimal } from "decimal.js";
import type { ResponseBankCentralDto } from "../../dtos/responseBankCentral.dto.js";

export interface IConectorBankCentralService {
  getPorcentageIPCA(dataBank: ResponseBankCentralDto[]): Decimal;
}
