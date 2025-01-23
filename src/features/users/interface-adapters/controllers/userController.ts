import { Request, Response } from "express"
import GetAllUserUseCase from "../../domain/use_cases/getAllUsers"
import UserRepository from "../../domain/repositories/UserRepository"
import UpdateUserUseCase from "../../domain/use_cases/updateUserById"

class UserController {
  userResposotry: UserRepository

  constructor(userResposotry: UserRepository) {
    this.userResposotry = userResposotry
  }

  register = async (req: Request, res: Response) => {
    const registerUser = new GetAllUserUseCase(this.userResposotry)
    try {
      await registerUser.execute(req.body)
      res.status(201).send("User registered successfully")
    } catch (err: any) {
      res.status(400).send(err.message)
    }
  }

  getListOfUsers = async (req: Request, res: Response) => {
    try {
      const getAllUser = new GetAllUserUseCase(this.userResposotry)

      const pageNumber = req.query.pageNumber ? parseInt(req.query.pageNumber as string) : 1

      const response = await getAllUser.execute({ limit: 10, pageNumber: pageNumber })

      res.status(200).send(response)
    } catch (err: any) {
      res.status(400).send(err.message)
    }
  }

  getUserById = async (req: Request, res: Response) => {
    const token = req.headers.authorization

    try {
      res.status(200).json()
    } catch (err: any) {
      res.status(400).json({ error: err.message })
    }
  }

  updateUserById = async (req: Request, res: Response) => {
    try {
      const updateUserUseCase = new UpdateUserUseCase(this.userResposotry)
      const response = await updateUserUseCase.execute(req.body)
       res.status(200).json(response)
    } catch (err: any) {
      res.status(400).json({ error: err.message })
    }
  }

  deleteUserById = async (req: Request, res: Response) => {
    const token = req.headers.authorization

    try {
      res.status(200).json()
    } catch (err: any) {
      res.status(400).json({ error: err.message })
    }
  }
}

export default UserController
