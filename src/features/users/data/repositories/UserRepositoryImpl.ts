import UserRepository from "../../domain/repositories/UserRepository"
import { UserModelScheme, UserModel } from "../../../users/data/models/userModel"
import ApiResponse from "../../../../application/utils/apiResponse"
import ResponseMessages from "../../../../application/utils/customErrors"

class UserRepositoryImpl extends UserRepository {
  
  constructor() {
    super()
    this.getAllUser = this.getAllUser.bind(this)
    this.findByUsername = this.findByUsername.bind(this)
    this.save = this.save.bind(this)
  }

  async getAllUser({ pageNumber, limit = 10 }: { pageNumber: number; limit: number }): Promise<
    ApiResponse<{
      users: UserModel[]
      totalCount: number
    }>
  > {
    const skip = (pageNumber - 1) * limit
    const result = await UserModelScheme.aggregate([
      {
        $facet: {
          data: [{ $skip: skip }, { $limit: limit }, { $project: { __v: 0 } }],
          count: [{ $count: "totalCount" }],
        },
      },
    ])

    const users = result[0].data
    const totalCount = result[0].count.length > 0 ? result[0].count[0].totalCount : 0

    const response = ApiResponse.successResponse({
      data: {
        users,
        totalCount,
      },
      message: ResponseMessages.General.SUCCESS.message,
      statusCode: ResponseMessages.General.SUCCESS.code,
    })
    return response
  }

  async findByUsername(phoneNumber: string): Promise<ApiResponse<UserModel>> {
    const user: UserModel | null = await UserModelScheme.findOne({ phoneNumber: phoneNumber })

    if (!user) {
      throw ApiResponse.errorResponse({
        message: ResponseMessages.User.USER_NOT_FOUND.message,
        statusCode: ResponseMessages.User.USER_NOT_FOUND.code,
      })
    }

    return ApiResponse.successResponse({ message: "", data: user, statusCode: 200 })
  }

  async save(user: UserModel): Promise<ApiResponse<UserModel>> {
    const checkExistUser = await this.findByUsername(user.phoneNumber)
    if (checkExistUser.data?.phoneNumber) {
      throw ApiResponse.errorResponse({
        message: ResponseMessages.User.USER_ALREADY_EXIST.message,
        statusCode: ResponseMessages.User.USER_ALREADY_EXIST.code,
      })
    }
    await UserModelScheme.create(user)
    return ApiResponse.successResponse({
      message: ResponseMessages.User.USER_CREATED.message,
      data: user,
      statusCode: ResponseMessages.User.USER_CREATED.code,
    })
  }
  async updateUser(req: UserModel & { id: string }): Promise<ApiResponse<UserModel>> {
    if (!req.id) {
      throw ApiResponse.errorResponse({
        message: ResponseMessages.User.INVALID_CREDENTIALS.message,
        statusCode: ResponseMessages.User.INVALID_CREDENTIALS.code,
      })
    }
    const user: UserModel | null = await UserModelScheme.findByIdAndUpdate(
      { _id: req.id },
      { ...req },
      { new: true, runValidators: true },
    )
    if (!user) {
      throw ApiResponse.errorResponse({
        message: ResponseMessages.User.INVALID_CREDENTIALS.message,
        statusCode: ResponseMessages.User.INVALID_CREDENTIALS.code,
      })
    }

    return ApiResponse.successResponse({
      message: ResponseMessages.General.SUCCESS.message,
      data: user,
      statusCode: ResponseMessages.General.SUCCESS.code,
    })
  }
}

export default UserRepositoryImpl
