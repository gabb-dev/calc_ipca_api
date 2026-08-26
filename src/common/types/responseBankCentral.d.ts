import type Decimal from "decimal.js";

export type ResponseBankCentral = [
  {
    data: string;
    valor: Decimal;
  },
];
