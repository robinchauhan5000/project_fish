import { getAppCheck, VerifyAppCheckTokenResponse } from "firebase-admin/app-check"
import { UserModelScheme } from "../../../users/data/models/userModel"

type Result<T> = T | Error

export class AuthDataSource {
  static async loginUser(token: string): Promise<VerifyAppCheckTokenResponse | any> {
    try {
      const appCheckClaims = await getAppCheck().verifyToken(token)
      return appCheckClaims
    } catch (err) {
      return err
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
