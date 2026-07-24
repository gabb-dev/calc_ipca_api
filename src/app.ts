import express, { Router } from "express";
import dotenv from "dotenv";
import { CalculateRouter } from "./routes/calculate.route";

dotenv.config({ override: true });

const app = express();

const calculateRouter: CalculateRouter = new CalculateRouter();
calculateRouter.run();

app.use("/calculate", calculateRouter.getRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server rodando na porta ${process.env.PORT}`);
});
