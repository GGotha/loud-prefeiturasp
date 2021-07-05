import { Request, Response } from "express";
import CreateUpvote from "../../../app/CreateUpvote";
import DeleteUpvote from "../../../app/DeleteUpvote";
import CustomError from "../../../externals/errors/CustomError";

export default class OpinionUpvoteController {
  static async store(req: Request, res: Response) {
    const { id } = req.params;
    const { userId } = req;
    const { repositories } = req.serviceLocator;
    const { opinionUpvote: opinionUpvoteRepository } = repositories;

    const opinionId = parseInt(id);

    try {
      const upvote = await CreateUpvote(opinionId, userId, {
        opinionUpvoteRepository,
      });

      return res.send({ success: true, upvote });
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).send({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).send({
        success: false,
        message: "There was an error to create an upvote",
      });
    }
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    const { userId } = req;
    const { repositories } = req.serviceLocator;
    const { opinionUpvote: opinionUpvoteRepository } = repositories;

    const upvoteId = parseInt(id);

    try {
      await DeleteUpvote(upvoteId, userId, {
        opinionUpvoteRepository,
      });

      return res.send({ success: true, message: "Upvote has been deleted" });
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).send({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).send({
        success: false,
        message: "There was an error to delete an upvote",
      });
    }
  }
}
