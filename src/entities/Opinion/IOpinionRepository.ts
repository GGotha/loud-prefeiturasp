import Opinion from "./Opinion";

export default interface IOpinionRepository {
  getOpinions(): Promise<Opinion[] | null>;
  getOpinionsByOrder(order: any): Promise<Opinion[] | null>;
  createOpinion(content: string, userId: number): Promise<Opinion | null>;
  updateOpinion(
    opinionId: number,
    content: string,
    userId: number,
    role: string
  ): Promise<Opinion | null>;
  deleteOpinion(opinionId: number, role: string): Promise<boolean | null>;
}
