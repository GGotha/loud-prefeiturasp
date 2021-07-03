import CustomError from "../../../externals/errors/CustomError";
import { Request, Response } from "express";
import GetOpinions from "../../../app/GetOpinions";

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
        message: "There was an error to authenticate",
      });
    }
  }
}
