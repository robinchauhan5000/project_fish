import { Request, Response } from "express"
import cartRepository from "../../domain/repositories/CartRepository"
import GetCartUseCase from "../../domain/use_cases/getCartUsecase"
import AddItemInCartUseCase from "../../domain/use_cases/addItemInCartUseCase"
import RemoveItemInCart from "../../domain/use_cases/removeItemFromCartUsecase"

class CartController {
  private cartResposotry: cartRepository

  constructor(cartResposotry: cartRepository) {
    this.cartResposotry = cartResposotry
  }

  getCart = async (req: Request, res: Response) => {
    try {
      const getCartUseCase = new GetCartUseCase(this.cartResposotry)
      const response = await getCartUseCase.execute(req.body)
      res.status(200).json(response)
    } catch (err: any) {
      res.status(400).json({ error: err.message })
    }
  }

  addItemInCart = async (req: Request, res: Response) => {
    const addItem = new AddItemInCartUseCase(this.cartResposotry)
    try {
      const response = await addItem.execute(req.body)
      res.status(201).send(response)
    } catch (err: any) {
      res.status(400).send(err.message)
    }
  }

  removeItemInCart = async (req: Request, res: Response) => {
    try {
      const { productId, quantity, userId } = req.body
      const getCart = new RemoveItemInCart(this.cartResposotry)

      const response = await getCart.execute({ productId, quantity, userId })
      res.status(200).send(response)
    } catch (err: any) {
      res.status(400).send(err.message)
    }
  }
}

export default CartController
