import ApiResponse from "../../../../application/utils/apiResponse"
import { AddressModel } from "../../data/models/addressModel"
import AddressRepository from "../repositories/AddressRepository"

interface GetAllAddressRequest {
  userId: string
}

class GetAllAddressUseCase {
  constructor(private addressRepository: AddressRepository) {}

  async execute(request: GetAllAddressRequest): Promise<ApiResponse<AddressModel[]>> {
    return await this.addressRepository.getAllAddress({ userId: request.userId })
  }
}

export default GetAllAddressUseCase
