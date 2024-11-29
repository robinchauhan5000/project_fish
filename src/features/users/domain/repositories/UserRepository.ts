import { UserModel } from "../../../../application/models/mongo_model/userModel"

export abstract class UserRepository {
  abstract findByUsername(username: string): Promise<UserModel | null>
  abstract save(user: UserModel): Promise<UserModel>
}
