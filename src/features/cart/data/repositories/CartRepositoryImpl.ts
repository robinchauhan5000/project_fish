import ApiResponse from "../../../../application/utils/apiResponse"
import ResponseMessages from "../../../../application/utils/customErrors"
import { CartModel, CartModelScheme } from "../models/cartModel"
import VoidApiResponse from "../../../../application/utils/voidApiSuccessResponse"
import CartRepository from "../../domain/repositories/CartRepository"
import { CartEntity } from "../../domain/entities/cartEntity"
import { Types } from "mongoose"
import { ProductModel, ProductModelScheme } from "../../../products/data/models/productModel"

class CartRepositoryImpl extends CartRepository {
  removeItemFromCart = async ({
    userId,
    productId,
    quantity,
  }: {
    userId: string
    productId: string
    quantity: number
  }): Promise<ApiResponse<CartModel>> => {
    try {
      const userObjectId = new Types.ObjectId(userId);
      const itemObjectId = new Types.ObjectId(productId);

      const product = await ProductModelScheme.findOne({ productId: itemObjectId });
      if (!product) {
        return ApiResponse.errorResponse({
          message: ResponseMessages.Product.PRODUCT_NOT_FOUND.message,
          statusCode: ResponseMessages.Product.PRODUCT_NOT_FOUND.code,
        });
      }
 
      const updatedCart = await CartModelScheme.findOneAndUpdate(
        { userId: userObjectId },
        {
          // Decrease the quantity or remove the product
          $pull: {
            product: {
              $and: [
                { productId: itemObjectId },
                { quantity: { $lte: quantity } }, // Remove if quantity is less than or equal to `quantity`
              ],
            },
          },
          $inc: {
            "product.$[item].quantity": -quantity,
          },
        },
        {
          arrayFilters: [
            { "item.productId": itemObjectId }, // Match the specific product
            { "item.quantity": { $gt: quantity } }, // Only apply decrement if quantity is greater than `quantity`
          ],
          new: true, // Return the updated document
        }
      ).exec();
  
      if (!updatedCart) {
        return ApiResponse.errorResponse({
          message: ResponseMessages.Cart.CART_NOT_FOUND.message,
          statusCode: ResponseMessages.Cart.CART_NOT_FOUND.code,
        });
      }
  
      // Return the updated cart
      return ApiResponse.successResponse({
        message: ResponseMessages.General.SUCCESS.message,
        data: updatedCart,
        statusCode: ResponseMessages.General.SUCCESS.code,
      });
    } catch (error) {
      console.error(error);
      return ApiResponse.errorResponse({
        message: ResponseMessages.General.ERROR.message,
        statusCode: ResponseMessages.General.ERROR.code,
      });
    }
  
  }

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
      const userObjectId = new Types.ObjectId(userId);
      const itemObjectId = new Types.ObjectId(productId);
  
      const product: ProductModel | null = await ProductModelScheme.findOne({ productId: itemObjectId });
  
      if (!product) {
        return ApiResponse.errorResponse({
          message: ResponseMessages.Product.PRODUCT_NOT_FOUND.message,
          statusCode: ResponseMessages.Product.PRODUCT_NOT_FOUND.code,
        });
      }
  
      const updatedCart = await CartModelScheme.findOneAndUpdate(
        { userId: userObjectId },
        {
          // Add the product to the cart if it doesn't exist
          $setOnInsert: { userId: userObjectId },
          $inc: { "products.$[product].quantity": 1 },
          $addToSet: {
            items: {
              itemId: itemObjectId,
              quantity: 1,
              productPrice: product.productPrice,
              productThumbnail: product.productThumbnail, 
            },
          },
        },
        {
          arrayFilters: [
            {
              "product.productId": itemObjectId, 
            },
          ],
          upsert: true,
          new: true, 
        }
      ).exec();
  
      // If the cart was not found or the update failed, return an error
      if (!updatedCart) {
        return ApiResponse.errorResponse({
          message: ResponseMessages.Cart.CART_NOT_FOUND.message,
          statusCode: ResponseMessages.Cart.CART_NOT_FOUND.code,
        });
      }
  
      // Check if the quantity in the cart exceeds available stock
      const cartItem = updatedCart.product.find((item) => new Types.ObjectId(item.productId).equals(itemObjectId));
      if (cartItem && cartItem.quantity > product.quantity) {
        return ApiResponse.errorResponse({
          message: ResponseMessages.Cart.INSUFFICIENT_STOCK.message,
          statusCode: ResponseMessages.Cart.INSUFFICIENT_STOCK.code,
        });
      }
  
      // Return the updated cart
      return ApiResponse.successResponse({
        message: ResponseMessages.General.SUCCESS.message,
        data: updatedCart,
        statusCode: ResponseMessages.General.SUCCESS.code,
      });
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

  // removeItemFromCart = async ({
  //   userId,
  //   productId,
  //   quantity,
  // }: {
  //   userId: string
  //   productId: string
  //   quantity: number
  // }) => {
  //   try {
  //     const cart = await CartModelScheme.findOne({ userId: new Types.ObjectId(userId) })

  //     if (cart) {
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
