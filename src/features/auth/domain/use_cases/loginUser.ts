import { AuthRepository } from "../repositories/authRepository"
import { UserModel } from "../../../../features/web/users/data/models/userModel"
import ApiResponse from "../../../../application/utils/apiResponse"

interface LoginUserRequest {
  accessToken?: string
  phoneNumber: string
}

class LoginUser {
  constructor(private authRepository: AuthRepository) {}

  async execute(request: LoginUserRequest): Promise<ApiResponse<{ user: UserModel; accessToken: string }>> {
     return await this.authRepository.loginUser(request)
  }
}

export default LoginUser
