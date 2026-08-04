import { type Request, type Response, Router } from "express";
import { CalculateController } from "../controllers/calculate.controller.js";
import { verify } from "node:crypto";
import { VerifyDateMiddleware } from "../middlewares/verifyDate.middleware.js";

export class CalculateRouter {
  private routerApp: Router;
  private readonly calculateController: CalculateController;

  constructor(controller: CalculateController, routerDefinid?: Router) {
    this.calculateController = controller;
    if (!routerDefinid) {
      const router: Router = Router({
        caseSensitive: false,
        mergeParams: true,
      });
      this.routerApp = router;

      return;
    }
    this.routerApp = routerDefinid;
  }

  start(): void {
    this.configMiddleware();
    this.getData();
  }

  private getData(): void {
    this.routerApp.get("/", (req: Request, res: Response) => {
      this.calculateController.calculate(req, res);
    });

    return;
  }

  private configMiddleware() {
    this.routerApp.use(VerifyDateMiddleware.verify);
  }

  get getRouter(): Router {
    return this.routerApp;
  }
}
