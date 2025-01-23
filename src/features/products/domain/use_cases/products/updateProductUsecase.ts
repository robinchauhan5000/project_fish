import ApiResponse from "../../../../../application/utils/apiResponse"
import GenericUsecase from "../../../../../application/utils/genricUsecase"
import { ProductModel } from "../../../data/models/productModel"
import ProductRepository from "../../repositories/productRepository"

class UpdateProductUsecase extends GenericUsecase<ProductModel, ProductModel> {
  productRepository: ProductRepository
  constructor(productRepository: ProductRepository) {
    super()
    this.productRepository = productRepository
  }

  execute(request: ProductModel & { productId: string }): Promise<ApiResponse<ProductModel>> {
    console.log("🚀 ~ file: updateProductUsecase.ts:14 ~ UpdateProductUsecase ~ execute ~ request:", request)
    return this.productRepository.updateProduct(request)
  }
}

export default UpdateProductUsecase
