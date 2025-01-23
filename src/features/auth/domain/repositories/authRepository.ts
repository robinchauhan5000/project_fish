import ApiResponse from "../../../../application/utils/apiResponse"
import { UserModel } from "../../../users/data/models/userModel"

export abstract class AuthRepository {
  abstract loginUser({
    phoneNumber,
    accessToken,
  }: {
    accessToken?: string
    phoneNumber: string
  }): Promise<ApiResponse<{ user: UserModel; accessToken: string }>>
  abstract save(user: UserModel): Promise<UserModel>
}
