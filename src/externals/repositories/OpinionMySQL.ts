import { getRepository } from "typeorm";
import IOpinionRepository from "../../entities/Opinion/IOpinionRepository";
import Opinion from "../../entities/Opinion/Opinion";
import Opinions from "../orm/models/Opinions";

class OpinionMySQL implements IOpinionRepository {
  async getOpinions(): Promise<Opinion[] | null> {
    const opinion = getRepository(Opinions);

    const persistedOpinionUpvotes = await opinion
      .createQueryBuilder("op")
      .select("op")
      .addSelect("op.id_user")
      .addSelect("COALESCE(SUM(opv.upvote), 0)", "upvotes")
      .leftJoinAndSelect("opinion_upvotes", "opv", "op.id = opv.id_opinion")
      .groupBy("op.id")
      .orderBy("op.id", "ASC")
      .getRawMany();

    const buildObjectOpinionVotes = persistedOpinionUpvotes.map((opinion) => {
      return {
        id: opinion.op_id,
        id_user: opinion.id_user,
        content: opinion.op_content,
        upvotes: opinion.upvotes,
        created_at: opinion.op_created_at,
        updated_at: opinion.op_updated_at,
      };
    });

    if (!persistedOpinionUpvotes) {
      return null;
    }

    return buildObjectOpinionVotes;
  }

  async getOpinionsByOrder(order: any): Promise<Opinion[] | null> {
    const opinion = getRepository(Opinions);

    const persistedOpinionUpvotes = await opinion
      .createQueryBuilder("op")
      .select("op")
      .addSelect("op.id_user")
      .addSelect("COALESCE(SUM(opv.upvote), 0)", "upvotes")
      .leftJoinAndSelect("opinion_upvotes", "opv", "op.id = opv.id_opinion")
      .groupBy("op.id")
      .orderBy("upvotes", order)
      .getRawMany();

    const buildObjectOpinionVotes = persistedOpinionUpvotes.map((opinion) => {
      return {
        id: opinion.op_id,
        id_user: opinion.id_user,
        content: opinion.op_content,
        upvotes: opinion.upvotes,
        created_at: opinion.op_created_at,
        updated_at: opinion.op_updated_at,
      };
    });

    if (!persistedOpinionUpvotes) {
      return null;
    }

    return buildObjectOpinionVotes;
  }

  async createOpinion(data, userId: number): Promise<Opinion | null> {
    const opinionRepository = getRepository(Opinions);

    const { content } = data;

    const persistedOpinion = opinionRepository.create({
      id_user: userId,
      content,
      created_at: new Date(),
    });

    opinionRepository.save(persistedOpinion);

    const opinion = new Opinion({
      id_user: userId,
      content,
      created_at: new Date(),
    });

    return opinion;
  }
}

module.exports = new OpinionMySQL();
