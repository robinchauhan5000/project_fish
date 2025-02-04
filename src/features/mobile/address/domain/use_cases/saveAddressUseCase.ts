import AddressRepository from "../repositories/AddressRepository"
import { AddressEntity } from "../entities/addressEntity"
import { AddressModel, AddressType } from "../../data/models/addressModel"
import ApiResponse from "../../../../../application/utils/apiResponse"
import { Types } from "mongoose"

interface SaveAddressRequest {
  street: string
  city: string
  state: string
  postalCode: number
  isDefault: boolean
  userId: string
  landMark?: string
  addressType: AddressType
  phoneNumber: number
}
class SaveAddressUseCase {
  constructor(private addressRepository: AddressRepository) {}

  async execute(request: SaveAddressRequest): Promise<ApiResponse<AddressModel>> {
    const { state, city, isDefault, postalCode, street, userId, addressType, landMark, phoneNumber } = request

    ///TODO need to get this userId from the token not from the request
    const address = AddressEntity.create({
      state,
      city,
      isDefault,
      postalCode,
      street,
      userId: new Types.ObjectId(userId),
      addressType,
      landMark,
      phoneNumber,
    })
    return await this.addressRepository.saveAddress(address)
  }
}

export default SaveAddressUseCase
