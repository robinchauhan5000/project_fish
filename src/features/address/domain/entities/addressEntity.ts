import { Types } from "mongoose";
import { AddressModel } from "../../data/models/addressModel";

export class AddressEntity extends AddressModel {
  constructor({
    state,
    city,
    isDefault,
    postalCode,
    street,
    userId,
  }: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    isDefault: boolean;
    userId: Types.ObjectId;
  }) {
    super(
      street,
      city,
      state,
      postalCode,
      isDefault,
      userId.toString() // Pass as string
    );
  }

  static create({
    city = "",
    state = "",
    postalCode = "",
    isDefault = false,
    street = "",
    userId,
  }: Partial<AddressModel> & { userId: Types.ObjectId }) {
    return new AddressEntity({
      city,
      isDefault,
      postalCode,
      state,
      street,
      userId, // Directly pass as Types.ObjectId
    });
  }
}
