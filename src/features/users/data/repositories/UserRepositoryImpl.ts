import UserRepository from "../../domain/repositories/UserRepository"
import { UserModelScheme, UserModel } from "../../../users/data/models/userModel"

export class UserRepositoryImpl<T> extends UserRepository<T> {
  async getAllUser<T>({ pageNumber, limit = 10 }: { pageNumber: number; limit: number }): Promise<ApiResponse<T>> {
    const skip = (pageNumber - 1) * limit

    const allUsers = UserModelScheme.find().skip(skip).limit(10).exec()
    const response = ApiResponse.successResponse({
      data: allUsers as T, // Typecast the result if necessary
      message: ResponseMessages.General.SUCCESS,
      statusCode: 200,
    })
    return response
  }

  async findByUsername(phoneNumber: string): Promise<ApiResponse<T>> {
    const user = await UserModelScheme.findOne({ phoneNumber: phoneNumber })

    if (!user) {
      throw ApiResponse.errorResponse({ message: ResponseMessages.User.USER_NOT_FOUND, statusCode: 401 })
      // new Error("There is no user account associated with this phone number")
    }
    return ApiResponse.successResponse({ message: "", data: user, statusCode: 200 })
  }

  async save(user: UserModel): Promise<ApiResponse<T>> {
    const checkExistUser = await this.findByUsername(user.phoneNumber)
    if (checkExistUser) {
      throw new Error("User already exist with this number")
    }
    UserModelScheme.create(user)
    return ApiResponse.successResponse({ message: "", data: user, statusCode: 200 })
  }
}
