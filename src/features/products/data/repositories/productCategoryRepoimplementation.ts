import ApiResponse from "../../../../application/utils/apiResponse"
import VoidApiResponse from "../../../../application/utils/voidApiSuccessResponse"
import ProductCategoryRepository from "../../domain/repositories/productCategoryRepository"
import { ProductCategoryModel } from "../models/productCategoryModel"

class ProductCategoryRepoImplementation extends ProductCategoryRepository {
  addProductCategories(): Promise<ApiResponse<ProductCategoryModel>> {
    throw new Error("Method not implemented.")
  }
  getAllProductCategoriesList(): Promise<ApiResponse<ProductCategoryModel[]>> {
    throw new Error("Method not implemented.")
  }
  removeProductCategories(): Promise<VoidApiResponse> {
    throw new Error("Method not implemented.")
  }
}

export default ProductCategoryRepoImplementation
