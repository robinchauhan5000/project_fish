import AddressRepository from "../repositories/AddressRepository"
import { AddressEntity } from "../entities/addressEntity"
import { AddressModel } from "../../data/models/addressModel"
import ApiResponse from "../../../../application/utils/apiResponse"

interface SaveAddressRequest {
  street: string
  city: string
  state: string
  postalCode: string
  isDefault: boolean
}
class SaveAddressUseCase {
  constructor(private addressRepository: AddressRepository) {}

  async execute(request: SaveAddressRequest): Promise<ApiResponse<AddressModel>> {
    const { state, city, isDefault, postalCode, street } = request
    const address = AddressEntity.create({ state, city, isDefault, postalCode, street })
    return await this.addressRepository.saveAddress(address)
  }
}

export default SaveAddressUseCase
