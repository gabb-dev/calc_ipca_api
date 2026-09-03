import { Decimal } from "decimal.js";
import type { ICalculateService } from "../common/interfaces/calculateService.interface.js";

export class CalculateService implements ICalculateService {
  constructor() {}

  calculate(value: Decimal, porcentage: Decimal): string {
    const newValue: Decimal = value.mul(porcentage);

    const valueFormated: string = this.formatValues(newValue);

    return valueFormated;
  }

  private formatValues(value: Decimal): string {
    const valueFormated: string = value.toFixed(2);
    return valueFormated;
  }
}
