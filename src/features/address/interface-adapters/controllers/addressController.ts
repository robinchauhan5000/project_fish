import { Request, Response } from "express"
import AddressRepository from "../../domain/repositories/AddressRepository"

class AddressController {
  addressResposotry: AddressRepository

  constructor(addressResposotry: AddressRepository) {
    this.addressResposotry = addressResposotry
  }

  saveAddress = async (req: Request, res: Response) => {
    const registerUser = new GetAllUserUseCase(this.addressResposotry)
    try {
      await registerUser.execute(req.body)
      res.status(201).send("User registered successfully")
    } catch (err: any) {
      res.status(400).send(err.message)
    }
  }

  getListOfAddress = async (req: Request, res: Response) => {
    try {
      const getAllUser = new GetAllUserUseCase(this.addressResposotry)

      const pageNumber = req.query.pageNumber ? parseInt(req.query.pageNumber as string) : 1

      const response = await getAllUser.execute({ limit: 10, pageNumber: pageNumber })

      res.status(200).send(response)
    } catch (err: any) {
      res.status(400).send(err.message)
    }
  }


  updateAddressById = async (req: Request, res: Response) => {
    try {
      const updateUserUseCase = new UpdateUserUseCase(this.addressResposotry)
      const response = await updateUserUseCase.execute(req.body)
      console.log("🚀 ~ file: userController.ts:52 ~ UserController ~ updateUserById= ~ response:", response)
      res.status(200).json(response)
    } catch (err: any) {
      res.status(400).json({ error: err.message })
    }
  }

  deleteAddressById = async (req: Request, res: Response) => {

    try {
      res.status(200).json()
    } catch (err: any) {
      res.status(400).json({ error: err.message })
    }
  }
}

export default AddressController
