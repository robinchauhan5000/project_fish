import ApiResponse from "../../../../../application/utils/apiResponse"
import ResponseMessages from "../../../../../application/utils/customErrors"
import VoidApiResponse from "../../../../../application/utils/voidApiSuccessResponse"
import ProductCategoryRepository from "../../domain/repositories/productCategoryRepository"
import { ProductCategoryModel, ProductCategorySchema } from "../models/productCategoryModel"

class ProductCategoryRepoImplementation extends ProductCategoryRepository {
  async addProductCategories(productCategory: ProductCategoryModel): Promise<ApiResponse<ProductCategoryModel>> {
    try {
      const savedCategory = await ProductCategorySchema.create(productCategory)

      if (savedCategory) {
        return ApiResponse.successResponse({
          data: savedCategory,
          message: ResponseMessages.General.SUCCESS.message,
          statusCode: 201,
        })
      }
      return ApiResponse.errorResponse({
        statusCode: ResponseMessages.General.ERROR.code,
        message: ResponseMessages.General.ERROR.message,
        error: "Something went wrong while adding category",
      })
    } catch (error) {
      console.error("Error adding product category:", error)
      return ApiResponse.errorResponse({
        statusCode: ResponseMessages.General.ERROR.code,
        message: ResponseMessages.General.ERROR.message,
        error: error instanceof Error ? error.message : String(error),
      })
    }
  }
  async getAllProductCategoriesList(): Promise<ApiResponse<ProductCategoryModel[]>> {
    try {
      const categories = await ProductCategorySchema.find().select('-__v') // Fetch categories from MongoDB
      console.log(
        "🚀 ~ file: productCategoryRepoimplementation.ts:13 ~ ProductCategoryRepoImplementation ~ getAllProductCategoriesList ~ categories:",
        categories,
      )
      return ApiResponse.successResponse({
        data: categories,
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
  removeProductCategories(): Promise<VoidApiResponse> {
    throw new Error("Method not implemented.")
  }
}

export default ProductCategoryRepoImplementation
