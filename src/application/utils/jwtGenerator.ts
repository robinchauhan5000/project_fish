import jwt from "jsonwebtoken"
import { logger } from "./logger"

class JwtGenerator {
  static generateToken = async (userId: string) => {
    try {
      const payload = { id: userId }
      const secret = process.env.JWT_SECRET
      if (!secret) {
        throw new Error("Unable to find JWT secret")
      }

      const options = { expiresIn: process.env.JWT_EXPIRATION }

      return jwt.sign(payload, secret!, options)
    } catch (e) {
      logger.info(`🚀 ~ file: jwtGenerator.ts:21 ~ JwtGenerator ~ e: ${e}`)
    }
  }

  static generateRefreshToken = (userId: string) => {
    const payload = { id: userId }
    const secret = process.env.JWT_REFRESH_SECRET
    if (secret) {
      throw new Error("Unable to find JWT secret")
    }

    const options = { expiresIn: process.env.JWT_EXPIRATION }

    return jwt.sign(payload, secret!, options)
  }
}

export default JwtGenerator
