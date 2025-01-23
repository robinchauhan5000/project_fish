import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { UserModelScheme } from "../../features/users/data/models/userModel"

class AuthMiddleware {
  authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"]?.split(" ")[1]

    if (!token) {
      return res.status(401).json({ message: "Access token missing or invalid" })
    }
    const secret = process.env.JWT_SECRET
    if (secret) {
      throw new Error("Unable to find JWT secret")
    }

    jwt.verify(token, secret!, (err, user: any) => {
      if (err) {
        return res.status(403).json({ message: "Token is invalid or expired" })
      }
      const userDetail = UserModelScheme.findById(user.id)
      req.user = userDetail // Attach decoded user info to `req`
      next()
    })
  }
}

export default AuthMiddleware
