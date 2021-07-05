import { getRepository } from "typeorm";
import IOpinionUpvoteRepository from "../../entities/OpinionUpvote/IOpinionUpvoteRepository";
import OpinionUpvote from "../../entities/OpinionUpvote/OpinionUpvote";
import Opinions from "../orm/models/Opinions";
import OpinionUpvotes from "../orm/models/OpinionUpvotes";

class OpinionUpvoteMySQL implements IOpinionUpvoteRepository {
  async createOpinionUpvote(
    opinionId: number,
    userId: number
  ): Promise<OpinionUpvote | null> {
    const opinionRepository = getRepository(Opinions);

    const persistedOpinion = await opinionRepository.findOne({
      where: { id: opinionId },
    });

    if (!persistedOpinion) {
      return null;
    }

    const opinionUpvoteRepository = getRepository(OpinionUpvotes);

    const persistedOpinionUpvote = opinionUpvoteRepository.create({
      id_user: userId,
      id_opinion: opinionId,
      upvote: true,
      created_at: new Date(),
    });

    opinionUpvoteRepository.save(persistedOpinionUpvote);

    const opinionUpvote = new OpinionUpvote({
      id_user: userId,
      id_opinion: opinionId,
      upvote: true,
      created_at: new Date(),
    });

    return opinionUpvote;
  }

  async deleteOpinionUpvote(
    upvoteId: number,
    userId: number
  ): Promise<boolean | null> {
    const opinionUpvoteRepository = getRepository(OpinionUpvotes);

    const thisUpvoteExists = await opinionUpvoteRepository.findOne({
      where: { id: upvoteId },
    });

    if (!thisUpvoteExists) {
      return null;
    }

    const deleteUpvote = await opinionUpvoteRepository.delete({
      id: upvoteId,
      id_user: userId,
    });

    if (!deleteUpvote.affected) {
      return null;
    }

    return true;
  }
}

module.exports = new OpinionUpvoteMySQL();
