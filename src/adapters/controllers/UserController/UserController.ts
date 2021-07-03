import CustomError from "../../../externals/errors/CustomError";
import { Request, Response } from "express";
import AuthenticateUser from "../../../app/AuthenticateUser";
import CreateUser from "../../../app/CreateUser";

export default class UserController {
  static async session(req: Request, res: Response) {
    const { email, password } = req.body;
    const { repositories } = req.serviceLocator;
    const { user: userRepository } = repositories;

    try {
      const { user, token } = await AuthenticateUser(email, password, {
        userRepository,
      });

      return res.send({ success: true, user, token });
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).send({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).send({
        success: false,
        message: "There was an error to authenticate",
      });
    }
  }

  static async store(req: Request, res: Response) {
    const { email, name, password, confirm_password } = req.body;

    const { repositories } = req.serviceLocator;
    const { user: userRepository } = repositories;

    try {
      const { user, token } = await CreateUser(
        email,
        name,
        password,
        confirm_password,
        {
          userRepository,
        }
      );

      return res.send({ success: true, user, token });
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).send({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).send({
        success: false,
        message: "There was an error when create a new user",
      });
    }
  }
}
