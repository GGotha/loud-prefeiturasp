import IOpinionCommentRepository from "../../entities/OpinionComment/IOpinionCommentRepository";
import CustomError from "../../externals/errors/CustomError";

export default async (
  opinionCommentsId: number,
  userId: number,
  role: string,
  options: { opinionCommentRepository: IOpinionCommentRepository }
): Promise<boolean> => {
  const persistedOpinionComment =
    await options.opinionCommentRepository.deleteOpinionComment(
      opinionCommentsId,
      userId,
      role
    );

  if (!persistedOpinionComment) {
    throw new CustomError("This comment doesn't exist, try other id");
  }

  return true;
};
