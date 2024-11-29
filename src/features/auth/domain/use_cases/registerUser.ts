import { UserEntity } from "../../../users/domain/entities/user"
import {UserModel} from "../../../users/data/models/userModel"
import { AuthRepository } from "../repositories/authRepository"

interface RegisterUserRequest {
  phoneNumber: string
}

class RegisterUserUseCase {
  constructor(private userRepository: AuthRepository) {}

  async execute(request: RegisterUserRequest): Promise<UserModel> {
    const { phoneNumber } = request
    const user = UserEntity.create({ phoneNumber: phoneNumber })
    return await this.userRepository.save(user)
  }
}

export default RegisterUserUseCase
