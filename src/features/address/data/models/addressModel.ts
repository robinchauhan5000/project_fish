import { prop, getModelForClass } from "@typegoose/typegoose"
import { Types } from "mongoose"

class AddressModel {
  @prop({ required: true })
  street: string

  @prop({ required: true })
  city: string

  @prop({ required: true })
  state: string

  @prop({ required: true })
  postalCode: string

  @prop({ default: false })
  isDefault: boolean

  @prop({ required: true, ref: "user" }) // Reference to the User model
  userId: Types.ObjectId

  constructor(street: string, city: string, state: string, postalCode: string, isDefault: boolean, userId: string) {
    this.street = street
    this.city = city
    this.state = state
    this.postalCode = postalCode
    this.isDefault = isDefault
    this.userId = new Types.ObjectId(userId)
  }

  // static create({
  //   street,
  //   city,
  //   state,
  //   postalCode,
  //   isDefault,
  //   userId,
  // }: Partial<AddressModel> & { userId: Types.ObjectId }): AddressModel {
  //   return new AddressModel(street ?? "", city ?? "", state ?? "", postalCode ?? "", isDefault ?? false, userId)
  // }
}

const AddressModelScheme = getModelForClass(AddressModel, {
  options: { customName: "address" },
  schemaOptions: { collection: "address" },
})

export { AddressModel, AddressModelScheme }
