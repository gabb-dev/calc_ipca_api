import { Decimal } from "decimal.js";
import type { ResponseBankCentral } from "../common/types/responseBankCentral.js";

export class ConectorBankCentralService {
  getPorcentageIPCA(dataBank: ResponseBankCentral): Decimal {
    let porcentagesFormated: Array<Decimal> = [];
    let endPorcentage: Decimal;

    for (const data of dataBank) {
      const porcentage: Decimal = new Decimal(1 + data.valor / 100);
      porcentagesFormated.push(porcentage);
    }

    endPorcentage = new Decimal(porcentagesFormated[0]!);
    for (const porcentage of porcentagesFormated) {
      if (endPorcentage === porcentagesFormated[0]) continue;
      endPorcentage = endPorcentage.mul(porcentage);
    }
    return endPorcentage;
  }
}
