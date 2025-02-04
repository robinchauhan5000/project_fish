import { UserModel } from "../../../users/data/models/userModel"

export class UserEntity extends UserModel {
  constructor(public firstName: string, public lastName: string, public phoneNumber: string) {
    super(firstName, lastName, phoneNumber)
  }

  static create({ firstName = "", lastName = "", phoneNumber = "" }: Partial<UserModel>) {
    return new UserEntity(firstName, lastName, phoneNumber)
  }
}
