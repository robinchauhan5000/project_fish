import { UserModel } from "../../data/models/userModel"
import UserRepository from "../repositories/UserRepository"
import ApiResponse from "../../../../../application/utils/apiResponse"

interface GetAllUserRequest {
  pageNumber: number
  limit: number
}

class GetAllUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(request: GetAllUserRequest): Promise<
    ApiResponse<{
      users: UserModel[]
      totalCount: number
    }>
  > {
    return await this.userRepository.getAllUser({ limit: request.limit, pageNumber: request.pageNumber })
  }
}

export default GetAllUserUseCase
