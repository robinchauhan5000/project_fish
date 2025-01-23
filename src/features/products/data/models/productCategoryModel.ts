import { getModelForClass, prop } from "@typegoose/typegoose"
import { Types } from "mongoose"

class ProductCategoryModel {
  @prop({ type: String })
  productCategoryName: string

  @prop({ type: Types.ObjectId, ref: "attachments" })
  image: string

  constructor({ image, productCategoryName }: { productCategoryName: string; image: string }) {
    this.image = image
    this.productCategoryName = productCategoryName
  }
}

const productCategorySchema = getModelForClass(ProductCategoryModel, {
  options: { customName: "productCategory" },
  schemaOptions: { collection: "productCategory" },
})

export { ProductCategoryModel, productCategorySchema }
