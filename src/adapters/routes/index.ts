import { Router } from "express";

import userRouter from "./user.routes";
import opinionRouter from "./opinion.routes";

const routes = Router();

routes.use("/user", userRouter);
routes.use("/opinion", opinionRouter);

export default routes;
