import { Decimal } from "decimal.js";

export interface ICalculateService {
  calculate(value: Decimal, porcentage: Decimal): string;
}
