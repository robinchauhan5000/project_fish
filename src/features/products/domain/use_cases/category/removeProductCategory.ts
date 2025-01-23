import ApiResponse from "../../../../../application/utils/apiResponse"
import GenericUsecase from "../../../../../application/utils/genricUsecase"
import VoidApiResponse from "../../../../../application/utils/voidApiSuccessResponse"
import ProductCategoryRepository from "../../repositories/productCategoryRepository"

class RemoveProductCategoryUseCase extends GenericUsecase<{ categoryId: string }, VoidApiResponse> {
  productCategoryRepo: ProductCategoryRepository

  constructor(productCategoryRepo: ProductCategoryRepository) {
    super()
    this.productCategoryRepo = productCategoryRepo
  }
  execute(request: { categoryId: string }): Promise<VoidApiResponse> {
    return this.productCategoryRepo.removeProductCategories(request)
  }
}

export default RemoveProductCategoryUseCase
