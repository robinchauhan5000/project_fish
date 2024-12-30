import ApiResponse from "../../../../application/utils/apiResponse"
import ResponseMessages from "../../../../application/utils/customErrors"
import { CartModel, CartModelScheme } from "../models/cartModel"
import VoidApiResponse from "../../../../application/utils/voidApiSuccessResponse"
import CartRepository from "../../domain/repositories/CartRepository"
import { CartEntity } from "../../domain/entities/cartEntity"
import { Types } from "mongoose"
import { ProductModel, ProductModelScheme } from "../../../products/data/models/productModel"

class CartRepositoryImpl extends CartRepository {
  removeItemFromCart({
    userId,
    itemId,
    quantity,
  }: {
    userId: string
    itemId: string
    quantity: number
  }): Promise<VoidApiResponse> {
    throw new Error("Method not implemented.")
  }

  addItemToCart = async ({
    userId,
    productId,
  }: {
    userId: string
    productId: string
  }): Promise<ApiResponse<CartModel>> => {
    try {
      const userObjectId = new Types.ObjectId(userId)
      const itemObjectId = new Types.ObjectId(productId)

      const product: ProductModel | null = await ProductModelScheme.findOne({ productId: productId })

      if (!product) {
        return ApiResponse.errorResponse({
          message: ResponseMessages.Product.PRODUCT_NOT_FOUND.message,
          statusCode: ResponseMessages.Product.PRODUCT_NOT_FOUND.code,
        })
      }

      const cartResponse = await CartModelScheme.findOneAndUpdate(
        { userId: userObjectId },
        {
          $setOnInsert: { userId: userObjectId },
          $inc: { "products.$[product].quantity": 1 },
          $addToSet: {
            items: { itemId: itemObjectId, quantity: 1, productPrice: product.productPrice },
          },
        },
        {
          arrayFilters: [{ "product.productId": itemObjectId }],
          upsert: true,
          new: true,
        },
      ).exec()

      return ApiResponse.successResponse({
        message: ResponseMessages.General.SUCCESS.message,
        data: cartResponse ?? [],
        statusCode: ResponseMessages.General.SUCCESS.code,
      })
    } catch (error) {
      throw ApiResponse.errorResponse({
        message: ResponseMessages.General.ERROR.message,
        statusCode: ResponseMessages.General.ERROR.code,
      })
    }
  }
  getAllItemsFromCart = async ({ userId }: { userId: string }): Promise<ApiResponse<CartModel[]>> => {
    try {
      const allAddress: CartModel[] | null = await CartModelScheme.find({ userId })
      return ApiResponse.successResponse({
        message: ResponseMessages.General.SUCCESS.message,
        data: allAddress ?? [],
        statusCode: ResponseMessages.General.SUCCESS.code,
      })
    } catch (error) {
      throw ApiResponse.errorResponse({
        message: ResponseMessages.General.ERROR.message,
        statusCode: ResponseMessages.General.ERROR.code,
      })
    }
  }

  // removeItemFromCart = async ({ userId, itemId, quantity }: { userId: string; itemId: string; quantity: number }) => {
  //   try {
  //     const cart = await CartModelScheme.findOne({ userId: new Types.ObjectId(userId) })

  //     if (cart) {
  //       const itemIndex = cart.product.findIndex((product) => product.productId.equals(itemId))

  //       if (itemIndex > -1) {
  //         cart.items[itemIndex].quantity -= quantity

  //         if (cart.items[itemIndex].quantity <= 0) {
  //           cart.items.splice(itemIndex, 1)
  //         }

  //         cart.totalItemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0)
  //         cart.grandTotalPrice = cart.items.reduce((sum, item) => sum + item.itemPrice * item.quantity, 0)

  //         await cart.save()

  //         // return cart
  //         return new VoidApiResponse({
  //           message: ResponseMessages.General.SUCCESS.message,
  //           statusCode: ResponseMessages.General.SUCCESS.code,
  //           success: true,
  //         })
  //       }
  //     }
  //   } catch (error) {
  //     return new VoidApiResponse({
  //       message: ResponseMessages.General.ERROR.message,
  //       statusCode: ResponseMessages.General.ERROR.code,
  //       success: false,
  //     })
  //   }
  //   return new VoidApiResponse({
  //     message: "Operation failed",
  //     statusCode: 400,
  //     success: false,
  //   })
  // }
}

export default CartRepositoryImpl
