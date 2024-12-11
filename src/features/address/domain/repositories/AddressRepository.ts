import ApiResponse from "../../../../application/utils/apiResponse"
import VoidApiResponse from "../../../../application/utils/voidApiSuccessResponse"
import { AddressModel } from "../../data/models/addressModel"

abstract class AddressRepository {
  abstract saveAddress(address: AddressModel): Promise<ApiResponse<AddressModel>>

  ///TODO define the return type
  abstract deleteAddress(id: string): Promise<VoidApiResponse>
  abstract getAllAddress({ userId }: { userId: string }): Promise<ApiResponse<AddressModel[]>>
  abstract updateAddress({
    city,
    isDefault,
    postalCode,
    state,
    street,
  }: AddressModel): Promise<ApiResponse<AddressModel>>
}

export default AddressRepository
