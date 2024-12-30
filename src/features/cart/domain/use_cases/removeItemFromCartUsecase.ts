import ApiResponse from "../../../../application/utils/apiResponse"
import CartRepository from "../repositories/CartRepository"

interface removeItemInCartRequest {
  id: string
}

class RemoveItemInCartUseCase {
  constructor(private cartRepository: CartRepository) {}

  async execute(request: removeItemInCartRequest): Promise<ApiResponse<{}> | null> {
    const { id } = request
    return await this.cartRepository.removeItemFromCart({itemId:id,quantity})
 
  }
}

export default RemoveItemInCartUseCase
