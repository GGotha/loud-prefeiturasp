import { errors } from "celebrate";
import express from "express";
import handler from "express-async-handler";
import OpinionUpvoteController from "../controllers/OpinionUpvoteController";
import ensureAuthentication from "../middlewares/auth";

const opinionUpvoteRouter = express.Router();

opinionUpvoteRouter.use(ensureAuthentication);

opinionUpvoteRouter.post("/:id", handler(OpinionUpvoteController.store));
opinionUpvoteRouter.delete("/:id", handler(OpinionUpvoteController.delete));

opinionUpvoteRouter.use(errors());

export default opinionUpvoteRouter;
