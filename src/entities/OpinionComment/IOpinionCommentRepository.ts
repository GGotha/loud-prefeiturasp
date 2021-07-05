import OpinionComment from "./OpinionComment";

export default interface IOpinionCommentRepository {
  createOpinionComment(
    opinionId: number,
    comment: string,
    userId: number
  ): Promise<OpinionComment | null>;
  updateOpinionComment(
    opinionId: number,
    opinionCommentsId: number,
    comment: string,
    userId: number,
    role: string
  ): Promise<OpinionComment | null>;
  deleteOpinionComment(
    opinionCommentsId: number,
    userId: number,
    role: string
  ): Promise<boolean | null>;
}
