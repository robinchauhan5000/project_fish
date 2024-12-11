import { prop, getModelForClass } from "@typegoose/typegoose"
class AddressModel {
  @prop()
  street: string
  @prop()
  city: string
  @prop()
  state: string
  @prop()
  postalCode: string
  @prop()
  isDefault: boolean

  constructor(street: string, city: string, state: string, postalCode: string, isDefault: boolean) {
    this.street = street
    this.city = city
    this.state = state
    this.postalCode = postalCode
    this.isDefault = isDefault
  }

  static create({ street, city, state, postalCode, isDefault }: Partial<AddressModel> = {}): AddressModel {
    return new AddressModel(street ?? "", city ?? "", state ?? "", postalCode ?? "", isDefault ?? false)
  }
}

const AddressModelScheme = getModelForClass(AddressModel, {
  options: { customName: "address" },
  schemaOptions: { collection: "address" },
})

export { AddressModel, AddressModelScheme }
