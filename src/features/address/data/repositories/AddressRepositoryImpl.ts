import AddressRepository from "../../domain/repositories/AddressRepository"
import ApiResponse from "../../../../application/utils/apiResponse"
import ResponseMessages from "../../../../application/utils/customErrors"
import { AddressModel, AddressModelScheme } from "../models/addressModel"
import { AddressEntity } from "../../domain/entities/addressEntity"
import VoidApiResponse from "../../../../application/utils/voidApiSuccessResponse"

class AddressRepositoryImpl extends AddressRepository {



  deleteAddress = async (id: string): Promise<VoidApiResponse> => {
    try {
      await AddressModelScheme.findByIdAndDelete(id);
  
      return new VoidApiResponse({
        message: ResponseMessages.General.SUCCESS.message,
        statusCode: ResponseMessages.General.SUCCESS.code,
        success: true,
      });
    } catch (error) {
      return new VoidApiResponse({
        message: ResponseMessages.General.ERROR.message,
        statusCode: ResponseMessages.General.ERROR.code,
        success: false,
      });
    }
  };



  saveAddress = async (address: AddressEntity): Promise<ApiResponse<AddressModel>> => {
    const updatedValue = await AddressModelScheme.create(address)
    try {
      return ApiResponse.successResponse({
        message: ResponseMessages.User.USER_CREATED.message,
        data: updatedValue,
        statusCode: ResponseMessages.User.USER_CREATED.code,
      })
    } catch (error) {
      throw ApiResponse.errorResponse({
        message: ResponseMessages.General.ERROR.message,
        statusCode: ResponseMessages.General.ERROR.code,
      })
    }
  }
  getAllAddress = async ({ userId }: { userId: string }): Promise<ApiResponse<AddressModel[]>> => {
    throw new Error("Method not implemented.")
  }
  updateAddress = async ({}: AddressModel): Promise<ApiResponse<AddressModel>> => {
    throw new Error("Method not implemented.")
  }
}

export default AddressRepositoryImpl
