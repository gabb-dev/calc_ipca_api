import { Decimal } from "decimal.js";
import type { ResponseBankCentralDto } from "../dtos/responseBankCentral.dto.js";
import type { IConectorBankCentralService } from "../common/interfaces/conectorBankCentralService.interface.js";

export class ConectorBankCentralService implements IConectorBankCentralService {
  getIndexIPCA(dataBank: ResponseBankCentralDto[]): Decimal {
    let indexFormated: Array<Decimal> = [];
    let endindex: Decimal;

    for (const data of dataBank) {
      const index: Decimal = new Decimal(1 + data.valor / 100);
      indexFormated.push(index);
    }

    endindex = indexFormated[0]!;
    for (let i = 1; i < indexFormated.length; i++) {
      endindex = endindex.mul(indexFormated[i]!);
    }
    return endindex;
  }
}
