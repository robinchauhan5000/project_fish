import ApiResponse from "../../../../application/utils/apiResponse"
import VoidApiResponse from "../../../../application/utils/voidApiSuccessResponse"
import { CartModel } from "../../data/models/cartModel"

abstract class CartRepository {
  abstract addItemToCart({
    userId,
    productId,
  }: {
    userId: string
    productId: string
  }): Promise<ApiResponse<CartModel>>
  abstract removeItemFromCart({
    userId,
    productId,
    quantity,
  }: {
    userId: string
    productId: string
    quantity: number
  }): Promise<ApiResponse<CartModel>>
  abstract getAllItemsFromCart({ userId }: { userId: string }): Promise<ApiResponse<CartModel[]>>
}

export default CartRepository
