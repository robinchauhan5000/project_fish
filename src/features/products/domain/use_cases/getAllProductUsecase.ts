import ApiResponse from "../../../../application/utils/apiResponse"
import GenericUsecase from "../../../../application/utils/genricUsecase"
import { ProductModel } from "../../data/models/productModel"
import ProductRepository from "../repositories/productRepository"

class GetAllProductsUsecase extends GenericUsecase<{ userId: string }, ProductModel[]> {
  productRepository: ProductRepository
  constructor(productRepository: ProductRepository) {
    super()
    this.productRepository = productRepository
  }

  execute(request: { userId: string }): Promise<ApiResponse<ProductModel[]>> {
    throw new Error("Method not implemented.")
  }
}

export default GetAllProductsUsecase
