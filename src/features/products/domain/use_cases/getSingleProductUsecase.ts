import ApiResponse from "../../../../application/utils/apiResponse"
import GenericUsecase from "../../../../application/utils/genricUsecase"
import { ProductModel } from "../../data/models/productModel"
import ProductRepository from "../repositories/productRepository"

class GetSingleProductUsecase extends GenericUsecase<{ productId: string }, ProductModel> {
  productRepository: ProductRepository
  constructor(productRepository: ProductRepository) {
    super()
    this.productRepository = productRepository
  }

  execute(request: { productId: string }): Promise<ApiResponse<ProductModel>> {
    throw new Error("Method not implemented.")
  }
}

export default GetSingleProductUsecase
