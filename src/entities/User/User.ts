export default class User {
  public readonly id: number;
  public id_role?: number;
  public email?: string;
  public name?: string;
  public password?: string;
  public created_at?: Date;
  public updated_at?: Date;

  constructor(props) {
    Object.assign(this, props);
  }
}
