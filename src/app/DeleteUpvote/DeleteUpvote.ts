import IOpinionUpvoteRepository from "@/entities/OpinionUpvote/IOpinionUpvoteRepository";
import OpinionUpvote from "../../entities/OpinionUpvote/OpinionUpvote";
import CustomError from "../../externals/errors/CustomError";

export default async (
  upvoteId: number,
  userId: number,
  options: { opinionUpvoteRepository: IOpinionUpvoteRepository }
): Promise<boolean> => {
  const persistedOpinionUpvote =
    await options.opinionUpvoteRepository.deleteOpinionUpvote(upvoteId, userId);

  if (!persistedOpinionUpvote) {
    throw new CustomError("This upvote doesn't exist, try other id");
  }

  return true;
};
