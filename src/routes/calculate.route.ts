import { Request, Response, Router } from "express";

export class CalculateRouter {
  private routerApp: Router;

  constructor() {
    const router: Router = Router({ caseSensitive: false, mergeParams: true });
    this.routerApp = router;
  }

  run(): void {
    this.getData();
  }

  private getData(): void {
    this.routerApp.get("/data/", (req: Request, res: Response) => {});

    return;
  }

  get getRouter(): Router {
    return this.routerApp;
  }
}
