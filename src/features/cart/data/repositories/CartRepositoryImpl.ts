import ApiResponse from "../../../../application/utils/apiResponse"
import ResponseMessages from "../../../../application/utils/customErrors"
import { CartModel, CartModelScheme } from "../models/cartModel"
import VoidApiResponse from "../../../../application/utils/voidApiSuccessResponse"
import CartRepository from "../../domain/repositories/CartRepository"
import { CartEntity } from "../../domain/entities/cartEntity"
import { Types } from "mongoose"
import { ProductModel, ProductModelScheme } from "../../../products/data/models/productModel"

class CartRepositoryImpl extends CartRepository {
  addItemToCart = async ({
    userId,
    productId,
    quantity,
  }: {
    userId: string
    productId: string
    quantity: number
  }): Promise<ApiResponse<CartModel>> => {
    try {
      const userObjectId = new userObjectId()
      const itemObjectId = new Types.ObjectId(productId)

      const product: ProductModel | null = await ProductModelScheme.findOne({ productId: itemObjectId })

      if (!product) {
        return ApiResponse.errorResponse({
          message: ResponseMessages.Product.PRODUCT_NOT_FOUND.message,
          statusCode: ResponseMessages.Product.PRODUCT_NOT_FOUND.code,
        })
      }

      const updatedCart = await CartModelScheme.findOneAndUpdate(
        { userId: userObjectId }, // Filter by user ID
        {
          // Check if product exists and update quantity or add a new product
          $setOnInsert: { userId: userObjectId }, // Ensure a cart is created if none exists
          $addToSet: {
            product: {
              $cond: {
                if: { $eq: ["$product.productId", new Types.ObjectId(productId)] },
                then: { $inc: { "product.$.quantity": quantity } },
                else: {
                  $each: [
                    {
                      productId: new Types.ObjectId(productId),
                      quantity,
                      productThumbnail: product.productThumbnail,
                      productPrice: product.productPrice,
                    },
                  ],
                },
              },
            },
          },
        },
        { new: true, upsert: true }, // Options: return updated document, create if not found
      )

      if (!updatedCart) {
        throw new Error("Failed to update the cart.")
      }

      return ApiResponse.successResponse({
        message: ResponseMessages.General.SUCCESS.message,
        data: updatedCart ?? [],
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

  removeItemFromCart = async ({
    userId,
    productId,
    quantity,
  }: {
    userId: string
    productId: string
    quantity: number
  }) => {
    try {
      const cart = await CartModelScheme.findOne({ userId: new Types.ObjectId(userId) })

      if (cart) {
      }
    } catch (error) {
      return new VoidApiResponse({
        message: ResponseMessages.General.ERROR.message,
        statusCode: ResponseMessages.General.ERROR.code,
        success: false,
      })
    }
    return new VoidApiResponse({
      message: "Operation failed",
      statusCode: 400,
      success: false,
    })
  }
}

export default CartRepositoryImpl
