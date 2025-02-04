import { ObjectId } from "mongoose"
import { CartModel } from "../../data/models/cartModel"

export class CartEntity extends CartModel {
  constructor({ userId, product = [] }: Partial<CartModel> & { userId: string }) {
    super({ userId, product })
  }

  static create({ userId, product = [] }: Partial<CartModel> & { userId: string }) {
    return new CartEntity({ userId, product })
  }
}
