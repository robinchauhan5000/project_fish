import ApiResponse from "../../../../../application/utils/apiResponse"
import GenericUsecase from "../../../../../application/utils/genricUsecase"
import { ProductCategoryModel } from "../../../data/models/productCategoryModel"
import ProductCategoryRepository from "../../repositories/productCategoryRepository"

class AddProductCategories extends GenericUsecase<ProductCategoryModel, ProductCategoryModel> {
  productCategoryRepo: ProductCategoryRepository

  constructor(productCategoryRepo: ProductCategoryRepository) {
    super()
    this.productCategoryRepo = productCategoryRepo
  }
  execute(request: ProductCategoryModel): Promise<ApiResponse<ProductCategoryModel>> {
    return this.productCategoryRepo.addProductCategories(request)
  }
}

export default AddProductCategories
