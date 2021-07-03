import User from "./User";

export default interface IUserRepository {
  createUser(userEntity: User): Promise<User | null>;
  getUserByEmailAndPassword(userEntity: User): Promise<User | null>;
}
