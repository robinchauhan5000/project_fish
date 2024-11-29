import UserRepository from "../repositories/UserRepository"

interface RegisterUserRequest {
  pageNumber: number
}

class DeleteUser<T> {
  constructor(private userRepository: UserRepository<T>) {}

  async execute(request: RegisterUserRequest): Promise<ApiResponse<T>> {
    const { pageNumber } = request
    return await this.userRepository.getAllUser({ pageNumber, limit: 10 })
  }
}

export default DeleteUser
