import { Types } from "mongoose"
import { AddressModel, AddressType } from "../../data/models/addressModel"

export class AddressEntity extends AddressModel {
  constructor({
    state,
    city,
    isDefault,
    postalCode,
    street,
    userId,
    phoneNumber,
    addressType,
    landMark,
  }: {
    street: string
    city: string
    state: string
    postalCode: number
    isDefault: boolean
    userId: Types.ObjectId
    phoneNumber?: number
    landMark?: string
    addressType: AddressType
  }) {
    super(street, city, state, postalCode, isDefault, userId.toString(), addressType, phoneNumber, landMark)
  }
  static create({
    city = "",
    state = "",
    postalCode = 148101,
    isDefault = false,
    street = "",
    userId,
    addressType = AddressType.HOME,
    phoneNumber,
    landMark,
  }: Partial<AddressModel> & { userId: Types.ObjectId }) {
    return new AddressEntity({
      addressType,
      city,
      isDefault,
      postalCode,
      state,
      street,
      userId,
      phoneNumber,
      landMark,
    })
  }
}
