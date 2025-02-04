import ApiResponse from "../../../../../../application/utils/apiResponse"
import GenericUsecase from "../../../../../../application/utils/genricUsecase"
import { ProductModel } from "../../../data/models/productModel"
import ProductRepository from "../../repositories/productRepository"

// Declare the correct generic types
class AddProductUsecase extends GenericUsecase<ProductModel, ProductModel> {
  productRepository: ProductRepository

  constructor(productRepository: ProductRepository) {
    super()
    this.productRepository = productRepository
  }
  async execute(request: ProductModel): Promise<ApiResponse<ProductModel>> {
    const response = await this.productRepository.addProduct(request)
    return response
  }
}

export default AddProductUsecase
