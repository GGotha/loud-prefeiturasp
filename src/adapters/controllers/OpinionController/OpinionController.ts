import { Request, Response } from "express";
import CreateOpinion from "../../../app/CreateOpinion/CreateOpinion";
import DeleteOpinion from "../../../app/DeleteOpinion";
import GetOpinions from "../../../app/GetOpinions";
import GetOpinionsByOrder from "../../../app/GetOpinionsByOrder";
import UpdateOpinion from "../../../app/UpdateOpinion";
import CustomError from "../../../externals/errors/CustomError";

export default class OpinionController {
  static async index(req: Request, res: Response) {
    const { repositories } = req.serviceLocator;
    const { opinion: opinionRepository } = repositories;

    try {
      const opinions = await GetOpinions({
        opinionRepository,
      });

      return res.send({ success: true, opinions });
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).send({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).send({
        success: false,
        message: "There was an error to find opinions",
      });
    }
  }

  static async indexOrder(req: Request, res: Response) {
    const { order } = req.params;
    const { repositories } = req.serviceLocator;
    const { opinion: opinionRepository } = repositories;

    try {
      const opinions = await GetOpinionsByOrder(order, { opinionRepository });

      return res.send({ success: true, opinions });
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).send({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).send({
        success: false,
        message: "There was an error to find opinions",
      });
    }
  }

  static async store(req: Request, res: Response) {
    const data = req.body;
    const { userId } = req;
    const { repositories } = req.serviceLocator;
    const { opinion: opinionRepository } = repositories;

    try {
      const opinion = await CreateOpinion(data, userId, {
        opinionRepository,
      });

      return res.send({ success: true, opinion });
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).send({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).send({
        success: false,
        message: "There was an error to create opinion",
      });
    }
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { content } = req.body;
    const { userId, role } = req;
    const { repositories } = req.serviceLocator;
    const { opinion: opinionRepository } = repositories;

    const opinionId = parseInt(id);

    try {
      const opinion = await UpdateOpinion(opinionId, content, userId, role, {
        opinionRepository,
      });

      return res.send({ success: true, opinion });
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).send({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).send({
        success: false,
        message: "There was an error to update opinion",
      });
    }
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    const { role } = req;
    const { repositories } = req.serviceLocator;
    const { opinion: opinionRepository } = repositories;

    const opinionId = parseInt(id);

    try {
      await DeleteOpinion(opinionId, role, {
        opinionRepository,
      });

      return res.send({ success: true, message: "Opinion has been deleted" });
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).send({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).send({
        success: false,
        message: "There was an error to delete opinion",
      });
    }
  }
}
