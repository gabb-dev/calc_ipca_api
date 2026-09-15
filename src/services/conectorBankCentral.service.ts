import { Decimal } from "decimal.js";
import type { ResponseBankCentralDto } from "../dtos/responseBankCentral.dto.js";

export class ConectorBankCentralService {
  getPorcentageIPCA(dataBank: ResponseBankCentralDto[]): Decimal {
    let porcentagesFormated: Array<Decimal> = [];
    let endPorcentage: Decimal;

    for (const data of dataBank) {
      const porcentage: Decimal = new Decimal(1 + data.valor / 100);
      porcentagesFormated.push(porcentage);
    }

    endPorcentage = porcentagesFormated[0]!;
    for (let i = 1; i < porcentagesFormated.length; i++) {
      endPorcentage = endPorcentage.mul(porcentagesFormated[i]!);
    }
    return endPorcentage;
  }
}
