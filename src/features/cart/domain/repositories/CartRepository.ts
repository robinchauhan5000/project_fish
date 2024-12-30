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
    itemId,
    quantity,
  }: {
    userId: string
    itemId: string
    quantity: number
  }): Promise<VoidApiResponse>
  abstract getAllItemsFromCart({ userId }: { userId: string }): Promise<ApiResponse<CartModel[]>>
}

export default CartRepository
