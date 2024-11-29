import { UserModel } from "../../../users/data/models/userModel"

export abstract class AuthRepository {
  abstract loginUser(username: string): Promise<UserModel | null>
  abstract save(user: UserModel): Promise<UserModel>
}
