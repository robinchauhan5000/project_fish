import { Request, Response } from "express"
import { AuthRepositoryImpl } from "../../data/repositories/authRepositoryImpl"
import RegisterUser from "../../domain/use_cases/registerUser"
import LoginUser from "../../domain/use_cases/loginUser"

class AuthController {
  authRepository: AuthRepositoryImpl

  constructor() {
    this.authRepository = new AuthRepositoryImpl()
  }

  register = async (req: Request, res: Response) => {
    const registerUser = new RegisterUser(this.authRepository)
    try {
      await registerUser.execute(req.body)
      res.status(201).send("User registered successfully")
    } catch (err: any) {
      res.status(400).send(err.message)
    }
  }

  login = async (req: Request, res: Response) => {
    const loginUser = new LoginUser(this.authRepository)
    const token = req.headers.authorization

    if (!token) {
      throw new Error("Authorization Token cannot be empty")
    }

    try {
      const result = await loginUser.execute({ token: token })
      res.status(200).json(result)
    } catch (err: any) {
      res.status(400).json({ error: err.message })
    }
  }
}

export default AuthController
