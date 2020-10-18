import express, { Application } from "express";
import helmet from "helmet";

import UserApi from "./content/user/routes/user.routes";

class App {
  app: Application;

  constructor() {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
  }

  start() {
    return this.app.listen(this.app.get("port"), () => {
      console.log(`Server on port ${this.app.get("port")}`);
    });
  }

  private routes(): void {
    this.app.use("/user", UserApi);
  }

  private settings(): void {
    this.app.set("port", process.env.PORT || 3000);
  }

  private middlewares(): void {
    this.app.use(helmet());
    this.app.use(express.json());
  }
}

export default App;
