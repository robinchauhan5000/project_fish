import { Request, Response } from "express"
import { AuthRepositoryImpl } from "../../data/repositories/authRepositoryImpl"
import RegisterUserUseCase from "../../domain/use_cases/registerUser"
import LoginUser from "../../domain/use_cases/loginUser"

class AuthController {
  authRepository: AuthRepositoryImpl

  constructor() {
    this.authRepository = new AuthRepositoryImpl()
  }

  register = async (req: Request, res: Response) => {
    const registerUserUseCase = new RegisterUserUseCase(this.authRepository)
    try {
      const response = await registerUserUseCase.execute(req.body)
      res.status(201).send(response)
    } catch (err: any) {
      res.status(400).send(err.message)
    }
  }

  login = async (req: Request, res: Response) => {
    const loginUser = new LoginUser(this.authRepository)
    const { phoneNumber } = req.body
    console.log("🚀 ~ file: authController.ts:26 ~ AuthController ~ login= ~ phoneNumber:", phoneNumber)

    if (!req.headers.authorization) {
      return res.status(401).json({ error: "Authorization Token cannot be empty" });
    }

    const accessToken = req.headers.authorization!.replace("Bearer", "").trim()

    try {
      const result = loginUser.execute({ accessToken, phoneNumber })

      console.log("🚀 ~ file: authController.ts:44 ~ AuthController ~ login= ~ result:", result)

      return res.status(200).json(result)
    } catch (err: any) {
      console.log("🚀 ~ file: authController.ts:48 ~ AuthController ~ login= ~ err:", err.message)
      return res.status(err.statusCode).json(err)
    }
  }
}

export default AuthController
