import { Router } from "express";

import userRouter from "./user.routes";
import opinionRouter from "./opinion.routes";
import opinionUpvoteRouter from "./opinion_upvote.routes";
import opinionCommentRouter from "./opinion_comment.routes";

const routes = Router();

routes.use("/user", userRouter);
routes.use("/opinion", opinionRouter);
routes.use("/opinion-upvote", opinionUpvoteRouter);
routes.use("/opinion-comment", opinionCommentRouter);

export default routes;
