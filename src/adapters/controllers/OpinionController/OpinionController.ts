import CustomError from "../../../externals/errors/CustomError";
import { Request, Response } from "express";
import GetOpinions from "../../../app/GetOpinions";
import GetOpinionsByOrder from "../../../app/GetOpinionsByOrder";
import CreateOpinion from "../../../app/CreateOpinion/CreateOpinion";

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
}
