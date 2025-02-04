import ApiResponse from "../../../../../application/utils/apiResponse"
import AddressRepository from "../repositories/AddressRepository"

interface DeleteAddressRequest {
  id: string
}

class DeleteAddressUseCase {
  constructor(private addressRepository: AddressRepository) {}

  async execute(request: DeleteAddressRequest): Promise<ApiResponse<{}> | null> {
    const { id } = request
    return await this.addressRepository.deleteAddress(id)
  }
}

export default DeleteAddressUseCase
