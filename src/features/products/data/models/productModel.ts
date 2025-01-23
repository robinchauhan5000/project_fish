import { prop, getModelForClass } from "@typegoose/typegoose"
import { Types } from "mongoose"

enum WeightUnit {
  killogram = "killogram",
  gram = "gram",
}

class ProductModel {
  @prop({ required: true })
  quantity?: number

  @prop({ required: true })
  productPrice?: number

  @prop({ required: true })
  productThumbnail?: string

  @prop({ required: true })
  productName?: string

  @prop({ type: () => Types.ObjectId, ref: "AttachmentModel" }) // Reference to attachments
  productImage?: Types.ObjectId

  @prop({ required: true })
  shortDescription?: string

  @prop({ required: true })
  longDescription?: string

  @prop({ required: true, type: String })
  manufacturingDate?: Date

  @prop({ required: true, type: String })
  expirationDate?: Date

  @prop({ required: true, type: String })
  createdAt?: string

  @prop({ required: true, type: () => Types.ObjectId, ref: "productCategory" })
  category?: Types.ObjectId

  @prop({ required: true, enum: WeightUnit })
  weightUnitType?: WeightUnit

  constructor({
    expirationDate,
    longDescription,
    manufacturingDate,
    productImage,
    productPrice,
    productThumbnail,
    quantity,
    shortDescription,
    weightUnitType,
    productName,
    category,
  }: {
    quantity?: number
    productPrice?: number
    productThumbnail?: string
    productImage?: Types.ObjectId
    shortDescription?: string
    longDescription?: string
    manufacturingDate?: Date
    expirationDate?: Date
    weightUnitType?: WeightUnit
    productName?: string
    category?: string
  }) {
    this.quantity = quantity
    this.productPrice = productPrice
    this.productThumbnail = productThumbnail
    this.productImage = productImage
    this.shortDescription = shortDescription
    this.longDescription = longDescription
    this.manufacturingDate = manufacturingDate
    this.expirationDate = expirationDate
    this.weightUnitType = weightUnitType
    this.productName = productName
    this.createdAt = new Date().toISOString()
    this.category = new Types.ObjectId(category)
  }
}

const ProductModelScheme = getModelForClass(ProductModel, {
  options: { customName: "products" },
  schemaOptions: { collection: "products" },
})

export { ProductModel, ProductModelScheme, WeightUnit }
