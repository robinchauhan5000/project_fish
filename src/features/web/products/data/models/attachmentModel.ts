import { prop, getModelForClass } from "@typegoose/typegoose"
import { Types } from "mongoose"

class AttachmentModel {
  @prop({ required: true })
  imageURL: string
  constructor(imageURL: string) {
    this.imageURL = imageURL
  }
}

const AttachmentModelScheme = getModelForClass(AttachmentModel, {
  options: { customName: "attachments" },
  schemaOptions: { collection: "attachments" },
})

export { AttachmentModel, AttachmentModelScheme }
