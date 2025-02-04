import { UserModel, UserModelScheme } from "../../../web/users/data/models/userModel"
import ApiResponse from "../../../../application/utils/apiResponse"
import ResponseMessages from "../../../../application/utils/customErrors"
import JwtGenerator from "../../../../application/utils/jwtGenerator"
import admin from "firebase-admin"
import { UserEntity } from "../../../web/users/domain/entities/user"

export class AuthDataSource {
  static async loginUser({
    phoneNumber,
    accessToken,
  }: {
    accessToken?: string
    phoneNumber: string
  }): Promise<ApiResponse<{ user: UserModel; accessToken: string }>> {
    try {
      let user: UserModel | null = await UserModelScheme.findOne({ phoneNumber: phoneNumber })
      console.log("🚀 ~ file: authData.ts:18 ~ AuthDataSource ~ user:", user)

      const response = await admin.auth().verifyIdToken(accessToken!)
      console.log("🚀 ~ file: authData.ts:21 ~ AuthDataSource ~ response:", response)

      if (!user) {
        user = UserEntity.create({ phoneNumber })
        UserModelScheme.create(user).then((res:any) => {
          console.log("🚀 ~ file: authData.ts:24 ~ AuthDataSource ~ UserModelScheme.create ~ res:", res)
          return ApiResponse.successResponse({
            message: ResponseMessages.User.USER_CREATED.message,
            statusCode: ResponseMessages.User.USER_CREATED.code,
            data: res,
          })
        })
      }

      if (response.phone_number === user!.phoneNumber) {
        const token = await JwtGenerator.generateToken(user?._id?.toString()!)
        if (token) {
          return ApiResponse.successResponse({
            message: ResponseMessages.General.SUCCESS.message,
            statusCode: ResponseMessages.General.SUCCESS.code,
            data: {
              accessToken: token,
              user: user!,
            },
          })
        }
      }

      return ApiResponse.errorResponse({
        message: ResponseMessages.User.INVALID_CREDENTIALS.message,
        statusCode: ResponseMessages.User.INVALID_CREDENTIALS.code,
      })
    } catch (err: any) {
      console.log("🚀 ~ file: authData.ts:59 ~ AuthDataSource ~ err:", err)
      return ApiResponse.errorResponse({
        message: ResponseMessages.Auth.AUTH_TOKEN_EXPIRED.message,
        statusCode: ResponseMessages.Auth.AUTH_TOKEN_EXPIRED.code,
        error: err.message,
      })
    }
  }

  static async save(user: any): Promise<any> {
    try {
      const checkExistUser = await UserModelScheme.findOne({ phoneNumber: user.phoneNumber })

      if (checkExistUser) {
        throw new Error(`User account is already exist with this number`)
      }

      const result = await UserModelScheme.create(user)

      return result
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Save operation failed: ${error.message}`)
      }
      throw new Error("An unexpected error occurred")
    }
  }
}
