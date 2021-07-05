import jwt from "jsonwebtoken";
import { Roles } from "../../@types/roles";
import { Session } from "../../@types/session";
import IUserRepository from "../../entities/User/IUserRepository";
import User from "../../entities/User/User";
import { secret, time } from "../../externals/config/auth";
import CustomError from "../../externals/errors/CustomError";

export default async (
  email: string,
  password: string,
  options: { userRepository: IUserRepository }
): Promise<Session> => {
  const user = new User({ email, password });

  const persistedUser = await options.userRepository.getUserByEmailAndPassword(
    user
  );

  if (!persistedUser) {
    throw new CustomError("Invalid email or password");
  }

  const session: Session = {
    user: persistedUser,
    token: generateToken(persistedUser.id, persistedUser.roles),
  };

  return session;
};

const generateToken = (userId: number, role: Roles): string => {
  return jwt.sign({ sub: { id: userId, role: role.name } }, secret, {
    expiresIn: time,
  });
};
