
import { UserRepository } from "../../../domain/repositories/UserRepository";
import UserModel from "../../../infrastructure/data/models/userModel";

// This is a mock repository. In a real-world application, you would replace this with a database.
const users: UserModel[] = [];

export class UserRepositoryImpl extends UserRepository {
  async findByUsername(username: string): Promise<UserModel | null> {
    const user = users.find(user => user.firstName === username);
    return user ? user : null;
  }

  async save(user: UserModel): Promise<UserModel> {
    users.push(user);
    return user
  }
}
