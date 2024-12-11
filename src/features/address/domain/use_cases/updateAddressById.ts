import ApiResponse from "../../../../application/utils/apiResponse"
import { AddressModel } from "../../data/models/addressModel"
import AddressRepository from "../repositories/AddressRepository"

class UpdateAddressUseCase {
  constructor(private addressRepository: AddressRepository) {}

  async execute(request: AddressModel): Promise<ApiResponse<AddressModel>> {
    return await this.addressRepository.updateAddress(request)
  }
}

export default UpdateAddressUseCase
