import { Request, Response } from "express"
import { UserModelScheme } from "../../data/models/userModel"

class UserController {
  async getListOfUsers(req: Request, res: Response) {
    try {
      const pageNumber = req.body.pageNumber

      const skip = (pageNumber - 1) * 10

      const allUsers = UserModelScheme.find().skip(skip).limit(10).exec()
      res.status(201).send({})
    } catch (err: any) {
      res.status(400).send(err.message)
    }
  }
  async getUserById(req: Request, res: Response) {
    const token = req.headers.authorization

    try {
      res.status(200).json()
    } catch (err: any) {
      res.status(400).json({ error: err.message })
    }
  }

  async updateUserById(req: Request, res: Response) {
    const token = req.headers.authorization

    try {
      res.status(200).json()
    } catch (err: any) {
      res.status(400).json({ error: err.message })
    }
  }

  async deleteUserById(req: Request, res: Response) {
    const token = req.headers.authorization

    try {
      res.status(200).json()
    } catch (err: any) {
      res.status(400).json({ error: err.message })
    }
  }
}

export default UserController
