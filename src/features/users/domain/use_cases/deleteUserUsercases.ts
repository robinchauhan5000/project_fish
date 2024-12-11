import { UserModel } from "../../data/models/userModel"
import UserRepository from "../repositories/UserRepository"
import ApiResponse from "../../../../application/utils/apiResponse"

interface RegisterUserRequest {
  pageNumber: number
}

class DeleteUser {
  constructor(private userRepository: UserRepository) {}

  async execute(request: RegisterUserRequest): Promise<ApiResponse<UserModel> | null> {
    const { pageNumber } = request
    // return await this.userRepository.getAllUser({ pageNumber, limit: 10 })
    return null
  }
}

export default DeleteUser
