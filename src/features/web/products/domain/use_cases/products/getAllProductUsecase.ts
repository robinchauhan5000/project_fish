import ApiResponse from "../../../../../../application/utils/apiResponse"
import GenericUsecase from "../../../../../../application/utils/genricUsecase"
import { ProductModel } from "../../../data/models/productModel"
import ProductRepository from "../../repositories/productRepository"

class GetAllProductsUsecase extends GenericUsecase<{}, ProductModel[]> {
  productRepository: ProductRepository
  constructor(productRepository: ProductRepository) {
    super()
    this.productRepository = productRepository
  }

  execute(): Promise<ApiResponse<ProductModel[]>> {
    return this.productRepository.getAllProducts()
  }
}

export default GetAllProductsUsecase
