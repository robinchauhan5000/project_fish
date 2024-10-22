
import UserModel  from "../../infrastructure/data/models/userModel";

export abstract class UserRepository {
  abstract findByUsername(username: string): Promise<UserModel | null>;
  abstract save(user: UserModel): Promise<UserModel>;
}
