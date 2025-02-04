import { prop, getModelForClass } from "@typegoose/typegoose"
import { Types } from "mongoose"

enum AddressType {
  HOME = "home",
  OFFICE = "office",
  OTHER = "other",
}
class AddressModel {
  @prop({ required: true })
  street: string

  @prop({ required: true })
  city: string

  @prop({ required: true })
  state: string

  @prop({ required: true })
  postalCode: number

  @prop({ required: false })
  landMark?: string

  @prop({ required: true, enum: AddressType }) // ✅ Enum defined here
  addressType: AddressType

  @prop({ required: false })
  phoneNumber?: number

  @prop({ default: false })
  isDefault: boolean

  @prop({ required: true, ref: "user" }) // Reference to the User model
  userId: Types.ObjectId

  constructor(
    street: string,
    city: string,
    state: string,
    postalCode: number,
    isDefault: boolean,
    userId: string,
    addressType: AddressType,
    phoneNumber?: number,
    landMark?: string,
  ) {
    this.street = street
    this.city = city
    this.state = state
    this.postalCode = postalCode
    this.isDefault = isDefault
    this.userId = new Types.ObjectId(userId)
    this.phoneNumber = phoneNumber
    this.landMark = landMark
    this.addressType = addressType
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

export { AddressModel, AddressModelScheme,AddressType }
