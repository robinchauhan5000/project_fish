import ApiResponse from "../../../../application/utils/apiResponse"
import VoidApiResponse from "../../../../application/utils/voidApiSuccessResponse"
import { ProductModel } from "../../data/models/productModel"

abstract class ProductRepository {
  abstract addProduct(product: ProductModel): Promise<ApiResponse<ProductModel>>
  abstract removeProduct({ productId }: { productId: string }): Promise<VoidApiResponse>
  abstract getProduct({ productId }: { productId: string }): Promise<ApiResponse<ProductModel>>
  abstract getAllProducts(): Promise<ApiResponse<ProductModel[]>>
  abstract updateProduct(product: ProductModel & { productId: string }): Promise<ApiResponse<ProductModel>>
}

export default ProductRepository
