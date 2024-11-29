import { prop, getModelForClass, index } from "@typegoose/typegoose"
class Address {
  @prop()
  street: string
  @prop()
  city: string
  @prop()
  state: string
  @prop()
  postalCode: string

  constructor(street: string, city: string, state: string, postalCode: string) {
    this.street = street
    this.city = city
    this.state = state
    this.postalCode = postalCode
  }

  static create({ street, city, state, postalCode }: Partial<Address> = {}): Address {
    return new Address(street ?? "", city ?? "", state ?? "", postalCode ?? "")
  }
}
@index({ phoneNumber: "asc" })
class UserModel {
  @prop()
  firstName: string
  @prop()
  lastName: string
  @prop({ required: true, unique: true, index: true })
  phoneNumber: string
  @prop({ type: () => [Address] })
  address: Address[]

  constructor(firstName: string, lastName: string, phoneNumber: string, address?: Address[]) {
    this.firstName = firstName
    this.lastName = lastName
    this.phoneNumber = phoneNumber
    this.address = address || []
  }

  static createEntity({ firstName, lastName, phoneNumber, address }: Partial<UserModel> = {}): UserModel {
    return new UserModel(firstName ?? "", lastName ?? "", phoneNumber ?? "", address ?? [])
  }
}

const UserModelScheme = getModelForClass(UserModel, {
  options: { customName: "user" },
  schemaOptions: { collection: "user" },
})

export { UserModel, UserModelScheme }
