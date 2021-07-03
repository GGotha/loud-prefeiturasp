import Opinion from "./Opinion";

export default interface IOpinionRepository {
  getOpinions(): Promise<Opinion[] | null>;
}
