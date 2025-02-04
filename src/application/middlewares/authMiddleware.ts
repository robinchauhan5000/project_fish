import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { UserModelScheme } from "../../features/web/users/data/models/userModel"
import ApiResponse from "../utils/apiResponse"
import ResponseMessages from "../utils/customErrors"

declare module "express-serve-static-core" {
  interface Request {
    user: any
  }
}
class AuthMiddleware {
  static authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"]?.split(" ")[1]

    if (!token) {
      return res.status(401).json({
        message: ResponseMessages.Auth.AUTH_TOKEN_EXPIRED.message,
        statusCode: ResponseMessages.Auth.AUTH_TOKEN_EXPIRED.code,
        error: "Token is required",
      })
    }

    const secret = process.env.JWT_SECRET

    if (!secret) {
      throw new Error("Unable to find JWT secret")
    }

    try {
      const decoded = jwt.verify(token, secret) as { id: string } // Adjust the payload structure as needed

      // Fetch user details from the database
      const userDetail = await UserModelScheme.findById(decoded.id)
      console.log("🚀 ~ file: authMiddleware.ts:35 ~ AuthMiddleware ~ authenticateToken= ~ userDetail:", userDetail)
      if (!userDetail) {
        return res.status(404).json(
          ApiResponse.errorResponse({
            message: ResponseMessages.User.USER_NOT_FOUND.message,
            statusCode: ResponseMessages.User.USER_NOT_FOUND.code,
            error: `Query failed with this user Id ${decoded}`,
          }),
        )
      }

      req.user = userDetail // Attach the user object to the request
      next()
    } catch (err) {
      return res.status(403).json({ message: "Token is invalid or expired" })
    }
  }
}

export default AuthMiddleware
