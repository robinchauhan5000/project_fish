import ApiResponse from "../../../../application/utils/apiResponse"
import VoidApiResponse from "../../../../application/utils/voidApiSuccessResponse"
import { ProductModel } from "../../data/models/productModel"

abstract class ProductRepository {
  abstract addProduct(product: ProductModel): Promise<ApiResponse<ProductModel>>
  abstract removeProduct({
    productId,
    quantity,
  }: {
    productId: string
    quantity: number
  }): Promise<VoidApiResponse>
  abstract getAllProducts(): Promise<ApiResponse<ProductModel[]>>
  abstract updateProduct(product: ProductModel): Promise<ApiResponse<ProductModel>>
}

export default ProductRepository
