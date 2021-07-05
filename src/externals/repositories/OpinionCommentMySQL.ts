import { getRepository } from "typeorm";
import IOpinionCommentRepository from "../../entities/OpinionComment/IOpinionCommentRepository";
import OpinionComment from "../../entities/OpinionComment/OpinionComment";
import OpinionComments from "../orm/models/OpinionComments";
import Opinions from "../orm/models/Opinions";

class OpinionCommentMySQL implements IOpinionCommentRepository {
  async createOpinionComment(
    opinionId: number,
    comment: string,
    userId: number
  ): Promise<OpinionComment | null> {
    const opinionRepository = getRepository(Opinions);

    const persistedOpinion = await opinionRepository.findOne({
      where: { id: opinionId },
    });

    if (!persistedOpinion) {
      return null;
    }

    const opinionCommentRepository = getRepository(OpinionComments);

    const persistedOpinionComment = opinionCommentRepository.create({
      id_user: userId,
      id_opinion: opinionId,
      comment,
    });

    opinionCommentRepository.save(persistedOpinionComment);

    const opinionComment = new OpinionComment({
      id_user: userId,
      id_opinion: opinionId,
      comment,
      created_at: new Date(),
    });

    return opinionComment;
  }

  async updateOpinionComment(
    opinionId: number,
    opinionCommentsId: number,
    comment: string,
    userId: number,
    role: string
  ): Promise<OpinionComment | null> {
    const opinionRepository = getRepository(Opinions);

    const persistedOpinion = await opinionRepository.findOne({
      where: { id: opinionId },
    });

    if (!persistedOpinion) {
      return null;
    }

    const opinionCommentRepository = getRepository(OpinionComments);

    if (role == "Administrator") {
      const persistedOpinionComment =
        await this.updateOpinionCommentAdministrator({
          repository: opinionCommentRepository,
          opinionCommentsId,
          opinionId,
          comment,
        });

      return persistedOpinionComment;
    }

    const persistedOpinionComment = await opinionCommentRepository.findOne({
      where: { id: opinionCommentsId, id_opinion: opinionId, id_user: userId },
    });

    if (!persistedOpinionComment) {
      return null;
    }

    persistedOpinionComment.comment = comment;

    opinionCommentRepository.save({ ...persistedOpinionComment });

    const opinionComment = new OpinionComment({
      ...persistedOpinionComment,
    });

    return opinionComment;
  }

  async deleteOpinionComment(
    opinionCommentsId: number,
    userId: number,
    role: string
  ): Promise<boolean | null> {
    const opinionCommentRepository = getRepository(OpinionComments);

    const thisCommentExists = await opinionCommentRepository.findOne({
      where: { id: opinionCommentsId },
    });

    if (!thisCommentExists) {
      return null;
    }

    if (role == "Administrator") {
      const deleteComment = await this.deleteOpinionCommentAdministrator({
        repository: opinionCommentRepository,
        opinionCommentsId,
      });

      if (!deleteComment.affected) {
        return null;
      }

      return true;
    }

    const deleteComment = await opinionCommentRepository.delete({
      id: opinionCommentsId,
      id_user: userId,
    });

    if (!deleteComment.affected) {
      return null;
    }

    return true;
  }

  async deleteOpinionCommentAdministrator({ repository, opinionCommentsId }) {
    return await repository.delete({
      id: opinionCommentsId,
    });
  }

  async updateOpinionCommentAdministrator({
    repository,
    opinionCommentsId,
    opinionId,
    comment,
  }) {
    const persistedOpinionComment = await repository.findOne({
      where: { id: opinionCommentsId, id_opinion: opinionId },
    });

    if (!persistedOpinionComment) {
      return null;
    }

    persistedOpinionComment.comment = comment;

    return repository.save({ ...persistedOpinionComment });
  }
}

module.exports = new OpinionCommentMySQL();
