import { prop, getModelForClass, index, modelOptions } from "@typegoose/typegoose"
import { Types } from "mongoose"
@modelOptions({
  schemaOptions: {
    toJSON: {
      transform: (_doc, ret) => {
        delete ret.__v
        return ret
      },
    },
    toObject: {
      transform: (_doc, ret) => {
        delete ret.__v
        return ret
      },
    },
  },
})
@index({ phoneNumber: "asc" })
class UserModel {
  @prop({ type: () => Types.ObjectId, auto: true })
  _id?: Types.ObjectId
  @prop()
  firstName: string
  @prop()
  lastName: string
  @prop({ required: true, unique: true, index: true })
  phoneNumber: string

  constructor(firstName: string, lastName: string, phoneNumber: string) {
    this.firstName = firstName
    this.lastName = lastName
    this.phoneNumber = phoneNumber
  }

  static createEntity({ firstName, lastName, phoneNumber }: Partial<UserModel> = {}): UserModel {
    return new UserModel(firstName ?? "", lastName ?? "", phoneNumber ?? "")
  }
}

const UserModelScheme = getModelForClass(UserModel, {
  options: { customName: "user" },
  schemaOptions: { collection: "user" },
})

export { UserModel, UserModelScheme }
