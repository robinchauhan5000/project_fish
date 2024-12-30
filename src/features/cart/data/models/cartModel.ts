import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose"
import { Types } from "mongoose"

class CartProduct {
  @prop({ required: true, ref: "product", type: Types.ObjectId })
  productId!: string

  @prop({ required: true })
  productThubnail!: string

  @prop({ required: true })
  quantity!: number

  @prop({ required: true })
  productPrice!: number

  constructor(productId: string, quantity: number, productPrice: number, productThubnail: string) {
    this.productId = productId
    this.quantity = quantity
    this.productThubnail = productThubnail
    this.productPrice = productPrice
  }
}

@modelOptions({
  schemaOptions: {
    collection: "cart",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
})
class CartModel {
  @prop({ required: true, type: () => [CartProduct] })
  product!: CartProduct[]

  @prop({ required: true, ref: "user", type: Types.ObjectId })
  userId!: string

  constructor({ userId, product }: { userId: string; product: CartProduct[] }) {
    this.userId = userId
    this.product = product.map(
      (product) => new CartProduct(product.productId, product.quantity, product.productPrice, product.productThubnail),
    )
  }

  // Virtual field for grandTotalPrice
  get grandTotalPrice(): number {
    return this.product.reduce((total, item) => total + item.quantity * item.productPrice, 0)
  }

  // Virtual field for totalItemCount
  get totalItemCount(): number {
    return this.product.reduce((count, item) => count + item.quantity, 0)
  }
}

const CartModelScheme = getModelForClass(CartModel)

export { CartProduct, CartModel, CartModelScheme }
