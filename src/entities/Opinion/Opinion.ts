export default class Opinion {
  public readonly id: number;
  public id_user?: number;
  public content?: string;
  public created_at?: Date;
  public updated_at?: Date;

  constructor(props) {
    Object.assign(this, props);
  }
}
