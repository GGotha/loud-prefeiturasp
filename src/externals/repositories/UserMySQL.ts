import bcrypt from "bcryptjs";
import { getRepository } from "typeorm";
import IUserRepository from "../../entities/User/IUserRepository";
import User from "../../entities/User/User";
import Users from "../orm/models/Users";

class UserMySQL implements IUserRepository {
  async createUser(user: User): Promise<User | null> {
    const { email, name, password } = user;

    const emailAlreadyExists = await this.checkIfEmailAlreadyExists(email);

    if (emailAlreadyExists) {
      return null;
    }

    const usersRepository = getRepository(Users);

    const persistedUser = usersRepository.create({
      email,
      name,
      password,
      created_at: new Date(),
    });

    const authenticatedUser = new User({
      ...persistedUser,
    });

    delete authenticatedUser.password;

    usersRepository.save(persistedUser);

    return authenticatedUser;
  }

  async getUserByEmailAndPassword(user: User): Promise<User | null> {
    const { email, password } = user;

    const usersRepository = getRepository(Users);

    const persistedUser = await usersRepository.findOne({
      where: { email },
      relations: ["roles"],
    });

    if (
      !persistedUser ||
      !(await this.checkPassword(password, persistedUser.password))
    ) {
      return null;
    }

    const authenticatedUser = new User({ ...persistedUser });

    delete authenticatedUser.password;

    return authenticatedUser;
  }

  private checkPassword(
    password: string,
    encryptedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, encryptedPassword);
  }

  private async checkIfEmailAlreadyExists(email: string) {
    const usersRepository = getRepository(Users);

    return await usersRepository.findOne({ where: { email } });
  }
}

module.exports = new UserMySQL();
