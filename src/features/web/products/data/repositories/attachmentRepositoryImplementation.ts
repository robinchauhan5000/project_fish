import ApiResponse from "../../../../../application/utils/apiResponse"
import ResponseMessages from "../../../../../application/utils/customErrors"
import VoidApiResponse from "../../../../../application/utils/voidApiSuccessResponse"
import AttachmentRepository from "../../domain/repositories/attachmentRepository"
import ProductImageRepository from "../../domain/repositories/attachmentRepository"
import ProductCategoryRepository from "../../domain/repositories/productCategoryRepository"
import { AttachmentModel, AttachmentModelScheme } from "../models/attachmentModel"
import { ProductCategoryModel, ProductCategorySchema } from "../models/productCategoryModel"

class AttachmentRepoImplementation extends AttachmentRepository {
  async addProductImage(productCategory: AttachmentModel): Promise<ApiResponse<AttachmentModel>> {
    try {
      const savedImage = await AttachmentModelScheme.create(productCategory)

      if (savedImage) {
        return ApiResponse.successResponse({
          data: savedImage,
          message: ResponseMessages.General.SUCCESS.message,
          statusCode: 201,
        })
      }
      return ApiResponse.errorResponse({
        statusCode: ResponseMessages.General.ERROR.code,
        message: ResponseMessages.General.ERROR.message,
        error: "Something went wrong while adding image",
      })
    } catch (error) {
      console.error("Error adding product image:", error)
      return ApiResponse.errorResponse({
        statusCode: ResponseMessages.General.ERROR.code,
        message: ResponseMessages.General.ERROR.message,
        error: error instanceof Error ? error.message : String(error),
      })
    }
  }
  async removeProductImage({ productImageId }: { productImageId: string }): Promise<ApiResponse<AttachmentModel>> {
    try {
      const productImages: AttachmentModel | null = await AttachmentModelScheme.findByIdAndDelete(
        productImageId,
      ).select("-__v")

      if (!productImages) {
        return ApiResponse.errorResponse({
          message: ResponseMessages.General.ERROR.message,
          statusCode: ResponseMessages.General.ERROR.code,
          error: "Something went wrong",
        })
      }

      return ApiResponse.successResponse({
        data: productImages,
        message: ResponseMessages.General.SUCCESS.message,
        statusCode: ResponseMessages.General.SUCCESS.code,
      })
    } catch (error) {
      console.error("Error fetching product categories:", error)
      return ApiResponse.errorResponse({
        message: ResponseMessages.General.ERROR.message,
        statusCode: ResponseMessages.General.ERROR.code,
        error: error instanceof Error ? error.message : String(error),
      })
    }
  }
}

export default AttachmentRepoImplementation
