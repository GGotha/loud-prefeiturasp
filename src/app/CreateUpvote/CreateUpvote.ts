import IOpinionUpvoteRepository from "@/entities/OpinionUpvote/IOpinionUpvoteRepository";
import OpinionUpvote from "../../entities/OpinionUpvote/OpinionUpvote";
import CustomError from "../../externals/errors/CustomError";

export default async (
  opinionId: number,
  userId: number,
  options: { opinionUpvoteRepository: IOpinionUpvoteRepository }
): Promise<OpinionUpvote> => {
  const persistedOpinionUpvote =
    await options.opinionUpvoteRepository.createOpinionUpvote(
      opinionId,
      userId
    );

  if (!persistedOpinionUpvote) {
    throw new CustomError("This upvote doesn't exist, try other id");
  }

  return persistedOpinionUpvote;
};
