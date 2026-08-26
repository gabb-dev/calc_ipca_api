import { Decimal } from "decimal.js";
import type { ResponseBankCentral } from "../types/responseBankCentral.js";

export interface IConectorBankCentralService {
  getPorcentageIPCA(dataBank: ResponseBankCentral): Decimal;
}
