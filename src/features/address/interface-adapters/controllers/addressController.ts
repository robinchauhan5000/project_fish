import { Request, Response } from "express"
import AddressRepository from "../../domain/repositories/AddressRepository"
import UpdateAddressUseCase from "../../domain/use_cases/updateAddressById"
import GetAllAddressUseCase from "../../domain/use_cases/getAllAddress"
import SaveAddressUseCase from "../../domain/use_cases/saveAddressUseCase"
import DeleteAddressUseCase from "../../domain/use_cases/deleteAddressUsecase"

class AddressController {
  addressResposotry: AddressRepository

  constructor(addressResposotry: AddressRepository) {
    this.addressResposotry = addressResposotry
  }

  saveAddress = async (req: Request, res: Response) => {
    const saveAddress = new SaveAddressUseCase(this.addressResposotry)
    try {
      const response = await saveAddress.execute(req.body)
      res.status(201).send(response)
    } catch (err: any) {
      res.status(400).send(err.message)
    }
  }

  getListOfAddress = async (req: Request, res: Response) => {
    try {
      const getAllUser = new GetAllAddressUseCase(this.addressResposotry)

      const response = await getAllUser.execute({ userId: req.body.userId })

      res.status(200).send(response)
    } catch (err: any) {
      res.status(400).send(err.message)
    }
  }

  updateAddressById = async (req: Request, res: Response) => {
    try {
      const updateAddressUseCase = new UpdateAddressUseCase(this.addressResposotry)
      const response = await updateAddressUseCase.execute(req.body)
      res.status(200).json(response)
    } catch (err: any) {
      res.status(400).json({ error: err.message })
    }
  }

  deleteAddressById = async (req: Request, res: Response) => {
    try {
      const deleteAddressUseCase = new DeleteAddressUseCase(this.addressResposotry)
      const response = await deleteAddressUseCase.execute(req.body)
      res.status(200).json(response)
    } catch (err: any) {
      res.status(400).json({ error: err.message })
    }
  }
}

export default AddressController
