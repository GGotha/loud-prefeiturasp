import IOpinionCommentRepository from "../../entities/OpinionComment/IOpinionCommentRepository";
import OpinionComment from "../../entities/OpinionComment/OpinionComment";
import CustomError from "../../externals/errors/CustomError";

export default async (
  opinionId: number,
  opinionCommentsId: number,
  comment: string,
  userId: number,
  role: string,
  options: { opinionCommentRepository: IOpinionCommentRepository }
): Promise<OpinionComment> => {
  const persistedOpinionComment =
    await options.opinionCommentRepository.updateOpinionComment(
      opinionId,
      opinionCommentsId,
      comment,
      userId,
      role
    );

  if (!persistedOpinionComment) {
    throw new CustomError("This comment doesn't exist, try other id");
  }

  return persistedOpinionComment;
};
