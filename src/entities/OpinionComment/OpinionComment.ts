export default class OpinionComment {
  public readonly id: number;
  public id_opinion?: number;
  public id_user?: string;
  public comment?: string;
  public created_at?: Date;
  public updated_at?: Date;

  constructor(props) {
    Object.assign(this, props);
  }
}
