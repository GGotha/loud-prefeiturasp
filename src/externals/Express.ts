import express, { Express, Request, Response, NextFunction } from "express";

import path from "path";
import dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

dotenv.config({
  path: path.resolve(__dirname, "..", "..", ".env." + process.env.NODE_ENV),
});

import bodyParser from "body-parser";
import Youch from "youch";
import helmet from "helmet";
import InvalidRoutes from "../adapters/routes/invalid.routes";
import Routes from "../adapters/routes";
import ServiceLocator from "./ServiceLocator";

export default class Server {
  public express: Express;

  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
    this.invalidRoutes();
    this.exception();

    this.createHTTPServer();
  }

  middlewares(): void {
    this.express.use(helmet());
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(this.buildServiceLocator);
  }

  buildServiceLocator(req: Request, res: Response, next: NextFunction): void {
    req.serviceLocator = ServiceLocator.getInstance();
    return next();
  }

  routes(): void {
    this.express.use(Routes);
  }

  invalidRoutes(): void {
    this.express.use(InvalidRoutes);
  }

  exception(): void {
    this.express.use(
      async (err: Error, req: Request, res: Response, next: NextFunction) => {
        let message: any = "Internal Server Error";

        if (process.env.NODE_ENV !== "production") {
          const youch = new Youch(err, req);
          message = await youch.toJSON();
        }

        return res.status(500).send({ success: false, message });
      }
    );
  }

  createHTTPServer(): void {
    this.express.listen(process.env.PORT);
    console.log(`Server running at port ${process.env.PORT}`);
  }
}
