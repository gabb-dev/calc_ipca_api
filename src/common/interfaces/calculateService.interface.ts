import { Decimal } from "decimal.js";
import type { ValuesFormated } from "../types/valuesFormated.js";

export interface ICalculateService {
  calculate(value: Decimal, porcentage: Decimal): ValuesFormated;
}
