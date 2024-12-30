import CartRepository from "../repositories/CartRepository"
import { CartModel } from "../../data/models/cartModel"
import ApiResponse from "../../../../application/utils/apiResponse"

interface AddItemRequest {
  userId: string
  productId: string
}

class AddItemCartUseCase {
  constructor(private cartRepository: CartRepository) {}

  async execute(request: AddItemRequest): Promise<ApiResponse<CartModel>> {
    const { userId, productId } = request

    const response = await this.cartRepository.addItemToCart({ userId, productId })

    return response
  }
}

export default AddItemCartUseCase
