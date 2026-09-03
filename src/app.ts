import express, { json } from "express";
import dotenv from "dotenv";
import { CalculateRouter } from "./routes/calculate.route.js";
import { CalculateController } from "./controllers/calculate.controller.js";
import { BankCentralProvider } from "./providers/bankCentral.provider.js";
import type { IBankCentralProvider } from "./common/interfaces/bankCentralProvider.interface.js";
import type { IConectorBankCentralService } from "./common/interfaces/conectorBankCentralService.interface.js";
import { ConectorBankCentralService } from "./services/conectorBankCentral.service.js";
import { CalculateService } from "./services/calculate.service.js";

dotenv.config({ override: true });
const app = express();

app.use(json());

const conectorBankCentralService: IConectorBankCentralService =
  new ConectorBankCentralService();

const calculateService: CalculateService = new CalculateService();

const bankCentralProvider: IBankCentralProvider = new BankCentralProvider(
  conectorBankCentralService,
);

const calculateController: CalculateController = new CalculateController(
  bankCentralProvider,
  calculateService,
);

const calculateRouter: CalculateRouter = new CalculateRouter(
  calculateController,
);

calculateRouter.start();

app.use("/calculate", calculateRouter.getRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server rodando na porta ${process.env.PORT ?? 3000}`);
});
