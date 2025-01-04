import ProductRepository from "../repositories/productRepository"

class UpdateProductUsecase {
  productRepository: ProductRepository
  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository
  }
}

export default UpdateProductUsecase
