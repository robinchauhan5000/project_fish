import { AuthRepository } from "../repositories/authRepository"
import { UserModel } from "../../../../features/users/data/models/userModel"
import ApiResponse from "../../../../application/utils/apiResponse"

interface LoginUserRequest {
  accessToken?: string
  phoneNumber: string
}

class LoginUser {
  constructor(private authRepository: AuthRepository) {}

  async execute(request: LoginUserRequest): Promise<ApiResponse<{ user: UserModel; accessToken: string }>> {
    console.log("🚀 ~ file: loginUser.ts:15 ~ LoginUser ~ execute ~ request:", request)
    return await this.authRepository.loginUser(request)
  }
}

export default LoginUser
