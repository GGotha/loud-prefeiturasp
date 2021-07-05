import { Request, Response } from "express";
import CreateComment from "../../../app/CreateComment";
import DeleteComment from "../../../app/DeleteComment";
import UpdateComment from "../../../app/UpdateComment";
import CustomError from "../../../externals/errors/CustomError";

export default class OpinionCommentController {
  static async store(req: Request, res: Response) {
    const { id_opinion: opinionId, comment } = req.body;
    const { userId } = req;
    const { repositories } = req.serviceLocator;
    const { opinionComment: opinionCommentRepository } = repositories;

    try {
      const opinionComment = await CreateComment(opinionId, comment, userId, {
        opinionCommentRepository,
      });

      return res.send({ success: true, opinionComment });
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).send({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).send({
        success: false,
        message: "There was an error to create a comment",
      });
    }
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { id_opinion: opinionId, comment } = req.body;
    const { userId, role } = req;
    const { repositories } = req.serviceLocator;
    const { opinionComment: opinionCommentRepository } = repositories;

    const opinionCommentsId = parseInt(id);

    try {
      const opinionComment = await UpdateComment(
        opinionId,
        opinionCommentsId,
        comment,
        userId,
        role,
        {
          opinionCommentRepository,
        }
      );

      return res.send({ success: true, opinionComment });
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).send({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).send({
        success: false,
        message: "There was an error to update a comment",
      });
    }
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    const { userId, role } = req;
    const { repositories } = req.serviceLocator;
    const { opinionComment: opinionCommentRepository } = repositories;

    const opinionCommentsId = parseInt(id);

    try {
      await DeleteComment(opinionCommentsId, userId, role, {
        opinionCommentRepository,
      });

      return res.send({ success: true, message: "Comment has been deleted" });
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).send({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).send({
        success: false,
        message: "There was an error to delete a comment",
      });
    }
  }
}
