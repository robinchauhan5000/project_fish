import ApiResponse from "../../../../../application/utils/apiResponse"
import GenericUsecase from "../../../../../application/utils/genricUsecase"
import { ProductCategoryModel } from "../../../data/models/productCategoryModel"
import ProductCategoryRepository from "../../repositories/productCategoryRepository"

class GetAllProductCategoryUsecase extends GenericUsecase<{}, ProductCategoryModel[]> {
  productCategoryRepo: ProductCategoryRepository

  constructor(productCategoryRepo: ProductCategoryRepository) {
    super()
    this.productCategoryRepo = productCategoryRepo
  }
  execute(): Promise<ApiResponse<ProductCategoryModel[]>> {
    return this.productCategoryRepo.getAllProductCategoriesList()
  }
}

export default GetAllProductCategoryUsecase
