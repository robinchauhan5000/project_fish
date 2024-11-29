import UserRepository from "../repositories/UserRepository"

interface GetAllUserRequest {
  pageNumber: number
  limit: number
}

class GetAllUser<T> {
  constructor(private userRepository: UserRepository<T>) {}

  async execute(request: GetAllUserRequest): Promise<ApiResponse<T>> {
    return await this.userRepository.getAllUser({ limit: request.limit, pageNumber: request.pageNumber })
  }
}

export default GetAllUser
