import UserModel from "../../infrastructure/data/models/userModel";

export class UserEntity extends UserModel {
  constructor(
    public firstName: string,
    public lastName: string,
    public phoneNumber: string
  ) {
    super(firstName, lastName, phoneNumber); // Pass required arguments to the parent constructor
  }
}