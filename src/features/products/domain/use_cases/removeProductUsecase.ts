import ApiResponse from "../../../../application/utils/apiResponse"
import GenericUsecase from "../../../../application/utils/genricUsecase"
import { ProductModel } from "../../data/models/productModel"
import ProductRepository from "../repositories/productRepository"

class RemoveProductUsecase extends GenericUsecase<{ productId: string }, ProductModel[]> {
  execute(request: { productId: string }): Promise<ApiResponse<ProductModel[]>> {
    throw new Error("Method not implemented.")
  }
  productRepository: ProductRepository
  constructor(productRepository: ProductRepository) {
    super()
    this.productRepository = productRepository
  }
}

export default RemoveProductUsecase
