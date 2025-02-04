import { UserModel } from "../../data/models/userModel"
import UserRepository from "../repositories/UserRepository"
import ApiResponse from "../../../../../application/utils/apiResponse"
import { Types } from "mongoose"

interface UpdateUserRequest {
  id: string
  firstName: string
  lastName: string
  phoneNumber: string
  address: Types.ObjectId
}

class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(request: UpdateUserRequest): Promise<ApiResponse<UserModel>> {
    return await this.userRepository.updateUser(request)
  }
}

export default UpdateUserUseCase
