import { prop, getModelForClass } from "@typegoose/typegoose"
import { Types } from "mongoose"

class AttachmentModel {
  @prop({ required: true })
  attachmentId: Types.ObjectId

  @prop({ required: true, ref: "products" })
  productId: Types.ObjectId

  @prop({ required: true })
  imageURL: string

  constructor(attachmentId: Types.ObjectId, productId: Types.ObjectId, imageURL: string) {
    this.attachmentId = attachmentId
    this.productId = productId
    this.imageURL = imageURL
  }
}

const AttachmentModelScheme = getModelForClass(AttachmentModel, {
    options: { customName: "attactments" },
    schemaOptions: { collection: "attachments" },
  })
  
  export { AttachmentModel, AttachmentModelScheme }
  

class ProductModel {
    @prop({ required: true })
    productId: Types.ObjectId
  
    @prop({ required: true })
    quantity: number
  
    @prop({ required: true })
    productPrice: number

    @prop({ required: true })
    productThumbnail: string
  
    @prop({ required: true })
    productImage: AttachmentModel[]
  
    @prop({ required: true })
    shortDescription: string
  
    @prop({ required: true })
    longDescription: string
  
    @prop({ required: true, type: String })
    manufacturingDate: Date
  
    @prop({ required: true, type: String })
    expirationDate: Date
  
    constructor(productId: Types.ObjectId, quantity: number, productPrice: number, productThumbnail: string, productImage: AttachmentModel[], shortDescription: string, longDescription: string, manufacturingDate: Date, expirationDate: Date) {
      this.productId = productId
      this.quantity = quantity
      this.productPrice = productPrice
      this.productThumbnail = productThumbnail
      this.productImage = productImage
      this.shortDescription = shortDescription
      this.longDescription = longDescription
      this.manufacturingDate = manufacturingDate
      this.expirationDate = expirationDate
    }
  }


const ProductModelScheme = getModelForClass(ProductModel, {
  options: { customName: "products" },
  schemaOptions: { collection: "products" },
})

export { ProductModel, ProductModelScheme }
