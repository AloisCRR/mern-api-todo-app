import { errorMiddleware } from "@common/middlewares/errorHandler.middleware";
import { notFound } from "@common/middlewares/notFound.middleware";
import envValidate from "@config/environment/env.validate";
import { TodoAPI } from "@models/todos/todos.module";
import { UserAPI } from "@models/users/users.module";
import { connectToMongoDB } from "@providers/database/mongo/provider.module";
import cookieParser from "cookie-parser";
import express, { Application } from "express";
import mongoSanitizer from "express-mongo-sanitize";
import helmet from "helmet";
class App {
  app: Application;

  constructor() {
    envValidate();
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
  }

  start() {
    return this.app.listen(process.env.PORT || 4000, () => {
      console.log(`Server on port ${process.env.PORT}`);
    });
  }

  private routes() {
    this.app.use("/user", UserAPI);
    this.app.use("/todo", TodoAPI);
    this.app.use(notFound);
    this.app.use(errorMiddleware);
  }

  private async settings() {
    await connectToMongoDB();
  }

  private middlewares() {
    this.app.use(mongoSanitizer());
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(cookieParser());
  }
}

export default App;
