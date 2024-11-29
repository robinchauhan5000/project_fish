import { UserModel } from "../../../users/data/models/userModel"

abstract class UserRepository<T> {
  abstract findByUsername(username: string): Promise<ApiResponse<T>>
  abstract save(user: UserModel): Promise<ApiResponse<T>>
  abstract getAllUser({ pageNumber, limit }: { pageNumber: number; limit: number }): Promise<ApiResponse<T>>
}

export default UserRepository
