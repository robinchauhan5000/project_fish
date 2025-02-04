import { prop, getModelForClass } from "@typegoose/typegoose"
import { Types } from "mongoose"
import { ProductCategoryModel } from "./productCategoryModel"

enum WeightUnit {
  kilogram = "kilogram",
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

  @prop({ type: () => [Types.ObjectId], ref: "attachments", required: false }) // Store multiple image references
  productImages?: Types.ObjectId[]

  @prop({ required: true })
  shortDescription?: string

  @prop({ required: true })
  longDescription?: string

  @prop({ required: true, type: String })
  manufacturingDate?: Date

  @prop({ required: true, type: String })
  expirationDate?: Date

  @prop({ required: true, type: () => Types.ObjectId, ref: "productCategory" })
  category?: Types.ObjectId

  @prop({ required: true, enum: WeightUnit })
  weightUnitType?: WeightUnit

  constructor({
    expirationDate,
    longDescription,
    manufacturingDate,
    productImages,
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
    productImages?: Types.ObjectId[] // Accept array of ObjectId
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
    this.productImages = productImages || [] // Ensure it's an array
    this.shortDescription = shortDescription
    this.longDescription = longDescription
    this.manufacturingDate = manufacturingDate
    this.expirationDate = expirationDate
    this.weightUnitType = weightUnitType
    this.productName = productName
    this.category = new Types.ObjectId(category)
  }
}

const ProductModelScheme = getModelForClass(ProductModel, {
  options: { customName: "products" },
  schemaOptions: { collection: "products", timestamps: true },
})

export { ProductModel, ProductModelScheme, WeightUnit }
