import { UserEntity } from "../entities/user"
import { UserModel } from "../../../users/data/models/userModel"
import { UserRepository } from "../repositories/UserRepository"

interface RegisterUserRequest {
  phoneNumber: string
}

class DeleteUser {
  constructor(private userRepository: UserRepository) {}

  async execute(request: RegisterUserRequest): Promise<UserModel> {
    const { phoneNumber } = request
    const user = UserEntity.create({ phoneNumber: phoneNumber })
    return await this.userRepository.save(user)
  }
}

export default DeleteUser
