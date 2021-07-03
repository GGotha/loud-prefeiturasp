import IUserRepository from "../../entities/User/IUserRepository";
import User from "../../entities/User/User";
import CustomError from "../../externals/errors/CustomError";
import bcrypt from "bcryptjs";
import { Session } from "../../@types/session";
import jwt from "jsonwebtoken";
import { secret, time } from "../../externals/config/auth";

export default async (
  email: string,
  name: string,
  password: string,
  confirm_password: string,
  options: { userRepository: IUserRepository }
): Promise<Session> => {
  if (password !== confirm_password) {
    throw new CustomError("Password and Confirm Password doesn't match");
  }

  password = await bcrypt.hash(password, 8);
  const user = new User({ email, name, password });

  const persistedUser = await options.userRepository.createUser(user);

  if (!persistedUser) {
    throw new CustomError("User already exists");
  }

  const session: Session = {
    user: persistedUser,
    token: generateToken(persistedUser.id),
  };

  return session;
};

const generateToken = (userId: number): string => {
  return jwt.sign({ sub: { id: userId } }, secret, {
    expiresIn: time,
  });
};
