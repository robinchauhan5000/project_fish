import { AuthRepository } from "../../domain/repositories/authRepository"
import { UserModel } from "../../../../features/users/data/models/userModel"
import { AuthDataSource } from "../data_sources/authData"

export class AuthRepositoryImpl extends AuthRepository {
  async loginUser(token: string): Promise<UserModel | null> {
    return AuthDataSource.loginUser(token)
  }

  async save(user: UserModel): Promise<UserModel> {
    return AuthDataSource.save(user)
  }
}
