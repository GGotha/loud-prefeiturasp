export default class OpinionUpvote {
  public readonly id: number;
  public id_opinion?: number;
  public id_user?: string;
  public upvote?: boolean;
  public created_at?: Date;
  public updated_at?: Date;

  constructor(props) {
    Object.assign(this, props);
  }
}
