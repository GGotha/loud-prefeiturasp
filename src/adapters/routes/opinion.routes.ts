import { errors } from "celebrate";
import express from "express";
import handler from "express-async-handler";
import OpinionController from "../controllers/OpinionController";
import CreateOpinionValidation from "../../externals/validations/CreateOpinionValidation";
import ensureAuthentication from "../middlewares/auth";

const opinionRouter = express.Router();

opinionRouter.get("/", handler(OpinionController.index));
opinionRouter.get("/:order", handler(OpinionController.indexOrder));

opinionRouter.use(ensureAuthentication);

opinionRouter.post(
  "/",
  CreateOpinionValidation,
  handler(OpinionController.store)
);

opinionRouter.use(errors());

export default opinionRouter;
