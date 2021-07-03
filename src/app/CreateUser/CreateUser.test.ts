import User from "@/entities/User/User";
import IUserRepository from "@/entities/User/IUserRepository";
import CreateUser from "./CreateUser";
import bcrypt from "bcryptjs";

class UserRepositorySpy implements IUserRepository {
  getUserByEmailAndPassword(user: User): Promise<User> {
    return new Promise(() => user);
  }

  createUser(user: User): Promise<User> {
    return new Promise(() => user);
  }
}
const mockUserRepository = new UserRepositorySpy();

describe("CreateUser", () => {
  it("Create a new user", async () => {
    const persistedUser = new User({ email: "test@gmail.com", password: "123mudar" });

    jest.spyOn(mockUserRepository, "createUser").mockImplementationOnce((): any => {
      return persistedUser;
    });

    const request = await CreateUser("test@gmail.com", "123mudar", "123mudar", {
      userRepository: mockUserRepository,
    });

    expect(request).toHaveProperty("token");
    expect(request).toHaveProperty("user");
    expect(request.user).toHaveProperty("email");
    expect(request.user).toHaveProperty("password");
    expect(request.user).toEqual(persistedUser);
  });

  it("Throws an error when create a new user fails", async () => {
    jest.spyOn(mockUserRepository, "createUser").mockImplementationOnce(() => {
      throw new Error();
    });

    const testFunction = () =>
      CreateUser("test@gmail.com", "123mudar", "123mudar", {
        userRepository: mockUserRepository,
      });

    expect(testFunction).rejects.toThrowError(Error);
  });
});
