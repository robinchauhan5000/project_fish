import ApiResponse from "../../../../application/utils/apiResponse"
import { CartModel } from "../../data/models/cartModel"
import CartRepository from "../repositories/CartRepository"

interface GetCartItemsRequest {
  userId: string
}

class GetAllAddressUseCase {
  constructor(private cartRepository: CartRepository) {}

  async execute(request: GetCartItemsRequest): Promise<ApiResponse<CartModel[]>> {
    return await this.cartRepository.getAllItemsFromCart({ userId: request.userId })
  }
}

export default GetAllAddressUseCase
