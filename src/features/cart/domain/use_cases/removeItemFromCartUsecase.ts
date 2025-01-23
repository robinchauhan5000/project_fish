import ApiResponse from "../../../../application/utils/apiResponse"
import CartRepository from "../repositories/CartRepository"

interface removeItemInCartRequest {
  productId: string
  userId: string
  quantity: number
}

class RemoveItemInCartUseCase {
  constructor(private cartRepository: CartRepository) {}

  async execute(request: removeItemInCartRequest): Promise<ApiResponse<{}> | null> {
    const { productId, userId, quantity } = request
    return await this.cartRepository.removeItemFromCart({ userId, productId, quantity })
  }
}

export default RemoveItemInCartUseCase
