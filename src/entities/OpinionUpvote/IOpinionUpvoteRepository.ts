import OpinionUpvote from "./OpinionUpvote";

export default interface IOpinionUpvoteRepository {
  createOpinionUpvote(
    opinionId: number,
    userId: number
  ): Promise<OpinionUpvote | null>;
  deleteOpinionUpvote(
    upvoteId: number,
    userId: number
  ): Promise<boolean | null>;
}
