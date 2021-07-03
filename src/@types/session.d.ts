import User from "../entities/User/User";

export interface Session {
  user: User;
  token: string;
}
