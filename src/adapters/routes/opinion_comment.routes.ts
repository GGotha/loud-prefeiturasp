import CreateOpinionCommentValidation from "../../externals/validations/CreateOpinionCommentValidation";
import UpdateOpinionCommentValidation from "../../externals/validations/UpdateOpinionCommentValidation";
import { errors } from "celebrate";
import express from "express";
import handler from "express-async-handler";
import OpinionCommentController from "../controllers/OpinionCommentController";
import ensureAuthentication from "../middlewares/auth";

const opinionCommentRouter = express.Router();

opinionCommentRouter.use(ensureAuthentication);

opinionCommentRouter.post(
  "/",
  CreateOpinionCommentValidation,
  handler(OpinionCommentController.store)
);
opinionCommentRouter.put(
  "/:id",
  UpdateOpinionCommentValidation,
  handler(OpinionCommentController.update)
);
opinionCommentRouter.delete("/:id", handler(OpinionCommentController.delete));

opinionCommentRouter.use(errors());

export default opinionCommentRouter;
