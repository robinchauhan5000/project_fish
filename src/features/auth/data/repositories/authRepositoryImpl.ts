import { AuthRepository } from "../../domain/repositories/authRepository"
import { UserModel } from "../../../../features/web/users/data/models/userModel"
import { AuthDataSource } from "../data_sources/authData"
import ApiResponse from "../../../../application/utils/apiResponse"

export class AuthRepositoryImpl extends AuthRepository {
  async loginUser({
    phoneNumber,
    accessToken,
  }: {
    accessToken?: string
    phoneNumber: string
  }): Promise<ApiResponse<{ user: UserModel; accessToken: string }>> {
    return AuthDataSource.loginUser({ phoneNumber, accessToken })
  }

  async save(user: UserModel): Promise<UserModel> {
    return AuthDataSource.save(user)
  }
}
