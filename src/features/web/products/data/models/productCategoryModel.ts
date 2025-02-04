import { getModelForClass, prop } from "@typegoose/typegoose"
import { Types } from "mongoose"

class ProductCategoryModel {
  @prop({ type: String })
  productCategoryName: string

  @prop({ type: String })
  categoryDisplayName: string

  @prop({ required: true, type: () => Types.ObjectId, ref: "attachments" })
  image: string

  constructor({
    image,
    productCategoryName,
    categoryDisplayName,
  }: {
    productCategoryName: string
    image: string
    categoryDisplayName: string
  }) {
    this.image = image
    this.productCategoryName = productCategoryName
    this.categoryDisplayName = categoryDisplayName
  }
}

const ProductCategorySchema = getModelForClass(ProductCategoryModel, {
  options: { customName: "productCategory" },
  schemaOptions: { collection: "productCategory" },
})

export { ProductCategoryModel, ProductCategorySchema }
