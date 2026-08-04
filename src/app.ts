import express from "express";
import dotenv from "dotenv";
import { CalculateRouter } from "./routes/calculate.route.js";
import { CalculateController } from "./controllers/calculate.controller.js";
import { VerifyDateMiddleware } from "./middlewares/verifyDate.middleware.js";

dotenv.config({ override: true });
const app = express();

const calculateController: CalculateController = new CalculateController();

const calculateRouter: CalculateRouter = new CalculateRouter(
  calculateController,
);

calculateRouter.start();

app.use("/calculate", calculateRouter.getRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server rodando na porta 3000`);
});
