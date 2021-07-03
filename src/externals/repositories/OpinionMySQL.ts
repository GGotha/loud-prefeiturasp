import { getRepository } from "typeorm";
import IOpinionRepository from "../../entities/Opinion/IOpinionRepository";
import Opinion from "../../entities/Opinion/Opinion";
import Opinions from "../orm/models/Opinions";

class OpinionMySQL implements IOpinionRepository {
  async getOpinions(): Promise<Opinion[] | null> {
    const opinion = getRepository(Opinions);

    const persistedOpinions = await opinion.find();

    if (!persistedOpinions) {
      return null;
    }

    return persistedOpinions;
  }
}

module.exports = new OpinionMySQL();
