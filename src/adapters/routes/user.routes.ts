import { errors } from "celebrate";
import express from "express";
import handler from "express-async-handler";
import AuthenticateUserValidation from "../../externals/validations/AuthenticateUserValidation";
import CreateUserValidation from "../../externals/validations/CreateUserValidation";
import UserController from "../controllers/UserController";

const userRouter = express.Router();

userRouter.post(
  "/session",
  AuthenticateUserValidation,
  handler(UserController.session)
);
userRouter.post("/", CreateUserValidation, handler(UserController.store));

userRouter.use(errors());

export default userRouter;
