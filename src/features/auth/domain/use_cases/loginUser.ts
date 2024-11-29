import { AuthRepository } from "../repositories/authRepository"
import { UserModel } from "../../../../features/users/data/models/userModel"

interface LoginUserRequest {
  token: string
}

class LoginUser {
  constructor(private authRepository: AuthRepository) {}

  async execute(request: LoginUserRequest): Promise<UserModel | null> {
    return await this.authRepository.loginUser(request.token)
  }
}

export default LoginUser
