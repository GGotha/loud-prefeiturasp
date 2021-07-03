import { errors } from "celebrate";
import express from "express";
import handler from "express-async-handler";
import OpinionController from "../controllers/OpinionController";

const opinionRouter = express.Router();

opinionRouter.get("/", handler(OpinionController.index));

opinionRouter.use(errors());

export default opinionRouter;
