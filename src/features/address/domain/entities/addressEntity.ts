import { AddressModel } from "../../data/models/addressModel"

export class AddressEntity extends AddressModel {
  constructor({
    state,
    city,
    isDefault,
    postalCode,
    street,
  }: {
    street: string
    city: string
    state: string
    postalCode: string
    isDefault: boolean
  }) {
    super(street, city, state, postalCode, isDefault)
  }

  static create({ city = "", state = "", postalCode = "", isDefault = false, street = "" }: Partial<AddressModel>) {
    return new AddressEntity({ city, isDefault, postalCode, state, street })
  }
}
