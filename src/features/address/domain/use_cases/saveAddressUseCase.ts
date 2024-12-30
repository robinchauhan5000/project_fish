import AddressRepository from "../repositories/AddressRepository"
import { AddressEntity } from "../entities/addressEntity"
import { AddressModel } from "../../data/models/addressModel"
import ApiResponse from "../../../../application/utils/apiResponse"
import { Types } from "mongoose"

interface SaveAddressRequest {
  street: string
  city: string
  state: string
  postalCode: string
  isDefault: boolean
  userId: string
}
class SaveAddressUseCase {
  constructor(private addressRepository: AddressRepository) {}

  async execute(request: SaveAddressRequest): Promise<ApiResponse<AddressModel>> {
    const { state, city, isDefault, postalCode, street, userId } = request


    ///TODO need to get this userId from the token not from the request
    const address = AddressEntity.create({
      state,
      city,
      isDefault,
      postalCode,
      street,
      userId: new Types.ObjectId(userId),
    })
    return await this.addressRepository.saveAddress(address)
  }
}

export default SaveAddressUseCase
