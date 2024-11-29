import jwt from "jsonwebtoken"

const secret = process.env.JWT_SECRET ?? ""

export const generateToken = (id: string) => {
  if (secret === "") {
    throw new Error("Please add jwt secret")
  }
  return jwt.sign({ id }, secret, { expiresIn: "1h" })
}

export const verifyToken = (token: string) => {
  if (secret === "") {
    throw new Error("Please add jwt secret")
  }
  try {
    return jwt.verify(token, secret)
  } catch (err: any) {
    return err.message
  }
}
