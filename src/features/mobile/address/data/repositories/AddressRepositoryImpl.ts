import AddressRepository from "../../domain/repositories/AddressRepository"
import ApiResponse from "../../../../../application/utils/apiResponse"
import ResponseMessages from "../../../../../application/utils/customErrors"
import { AddressModel, AddressModelScheme } from "../models/addressModel"
import { AddressEntity } from "../../domain/entities/addressEntity"
import VoidApiResponse from "../../../../../application/utils/voidApiSuccessResponse"

class AddressRepositoryImpl extends AddressRepository {
  deleteAddress = async (id: string): Promise<VoidApiResponse> => {
    try {
      const deletedAddress = await AddressModelScheme.findByIdAndDelete(id)
      console.log(
        "🚀 ~ file: AddressRepositoryImpl.ts:12 ~ AddressRepositoryImpl ~ deleteAddress ~ deletedAddress:",
        deletedAddress,
      )

      if (deletedAddress) {
        return new VoidApiResponse({
          message: ResponseMessages.General.SUCCESS.message,
          statusCode: ResponseMessages.General.SUCCESS.code,
          success: true,
        })
      }
      return new VoidApiResponse({
        message: ResponseMessages.Address.ADDRESS_NOT_FOUND.message,
        statusCode: ResponseMessages.Address.ADDRESS_NOT_FOUND.code,
        success: false,
      })
    } catch (error) {
      return new VoidApiResponse({
        message: ResponseMessages.General.ERROR.message,
        statusCode: ResponseMessages.General.ERROR.code,
        success: false,
      })
    }
  }

  saveAddress = async (address: AddressEntity): Promise<ApiResponse<AddressModel>> => {
    console.log("🚀 ~ file: AddressRepositoryImpl.ts:39 ~ AddressRepositoryImpl ~ saveAddress= ~ address:", address)
    try {
      const updatedValue = await AddressModelScheme.create(address)
      return ApiResponse.successResponse({
        message: ResponseMessages.General.SUCCESS.message,
        data: updatedValue,
        statusCode: ResponseMessages.General.SUCCESS.code,
      })
    } catch (error) {
      throw ApiResponse.errorResponse({
        message: ResponseMessages.General.ERROR.message,
        statusCode: ResponseMessages.General.ERROR.code,
      })
    }
  }
  getAllAddress = async ({ userId }: { userId: string }): Promise<ApiResponse<AddressModel[]>> => {
    try {
      const allAddress: AddressModel[] | null = await AddressModelScheme.find({ userId }).select("-__v")
      return ApiResponse.successResponse({
        message: ResponseMessages.General.SUCCESS.message,
        data: allAddress ?? [],
        statusCode: ResponseMessages.General.SUCCESS.code,
      })
    } catch (error) {
      throw ApiResponse.errorResponse({
        message: ResponseMessages.General.ERROR.message,
        statusCode: ResponseMessages.General.ERROR.code,
      })
    }
  }
  updateAddress = async ({
    address,
    addressId,
  }: {
    addressId: string
    address: AddressModel
  }): Promise<ApiResponse<AddressModel>> => {
    console.log("🚀 ~ file: AddressRepositoryImpl.ts:76 ~ AddressRepositoryImpl ~ addressId:", addressId)
    console.log("🚀 ~ file: AddressRepositoryImpl.ts:76 ~ AddressRepositoryImpl ~ address:", address)

    try {
      const updatedAddress: AddressModel | null = await AddressModelScheme.findByIdAndUpdate(
        addressId,
        { $set: { ...address } },
        {
          new: true,
          runValidators: true,
        },
      )
      console.log("🚀 ~ file: AddressRepositoryImpl.ts:88 ~ AddressRepositoryImpl ~ updatedAddress:", updatedAddress)

      if (!updatedAddress) {
        return ApiResponse.errorResponse({
          message: ResponseMessages.General.NOT_FOUND.message,
          statusCode: ResponseMessages.General.NOT_FOUND.code,
        })
      }

      return ApiResponse.successResponse({
        message: ResponseMessages.General.SUCCESS.message,
        data: updatedAddress,
        statusCode: ResponseMessages.General.SUCCESS.code,
      })
    } catch (error) {
      console.log("🚀 ~ file: AddressRepositoryImpl.ts:102 ~ AddressRepositoryImpl ~ error:", error)
      throw ApiResponse.errorResponse({
        message: ResponseMessages.General.ERROR.message,
        statusCode: ResponseMessages.General.ERROR.code,
      })
    }
  }
}

export default AddressRepositoryImpl
