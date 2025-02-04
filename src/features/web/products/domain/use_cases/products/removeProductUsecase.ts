import ApiResponse from "../../../../../../application/utils/apiResponse"
import GenericUsecase from "../../../../../../application/utils/genricUsecase"
import VoidApiResponse from "../../../../../../application/utils/voidApiSuccessResponse"
import { ProductModel } from "../../../data/models/productModel"
import ProductRepository from "../../repositories/productRepository"

class RemoveProductUsecase extends GenericUsecase<{ productId: string }, Promise<VoidApiResponse>> {
  productRepository: ProductRepository
  constructor(productRepository: ProductRepository) {
    super()
    this.productRepository = productRepository
  }
  execute({ productId }: { productId: string }): Promise<VoidApiResponse> {
    return this.productRepository.removeProduct({ productId })
  }
}

export default RemoveProductUsecase
