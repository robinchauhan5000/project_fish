import ApiResponse from "../../../../application/utils/apiResponse"
import { UserModel } from "../../../users/data/models/userModel"

abstract class UserRepository {
  abstract findByUsername(username: string): Promise<ApiResponse<UserModel>>
  abstract save(user: UserModel): Promise<ApiResponse<UserModel>>
  abstract getAllUser({ pageNumber, limit }: { pageNumber: number; limit: number }): Promise<
    ApiResponse<{
      users: UserModel[]
      totalCount: number
    }>
  >
  abstract updateUser({ lastName, firstName, phoneNumber }: UserModel): Promise<ApiResponse<UserModel>>

 }

export default UserRepository
