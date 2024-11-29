import { UserRepository } from "../../domain/repositories/UserRepository"
import { UserModelScheme, UserModel } from "../../../../application/models/mongo_model/userModel"

export class UserRepositoryImpl extends UserRepository {
  async findByUsername(phoneNumber: string): Promise<UserModel | null> {
    const user = await UserModelScheme.findOne({ phoneNumber: phoneNumber })

    if (!user) {
      throw new Error("There is no user account associated with this phone number")
    }
    return user ? user : null
  }

  async save(user: UserModel): Promise<UserModel> {
    const checkExistUser = await this.findByUsername(user.phoneNumber)
    if (checkExistUser) {
      throw new Error("User already exist with this number")
    }
    UserModelScheme.create(user)
    return user
  }
}
