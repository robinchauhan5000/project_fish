import { extend } from "joi"
import ProductRepository from "../../domain/repositories/productRepository"
import ApiResponse from "../../../../application/utils/apiResponse"
import VoidApiResponse from "../../../../application/utils/voidApiSuccessResponse"
import { ProductModel, ProductModelScheme } from "../models/productModel"
import ResponseMessages from "../../../../application/utils/customErrors"
import { Types } from "mongoose"

class ProductRepoImplementation extends ProductRepository {
  async addProduct(product: ProductModel): Promise<ApiResponse<ProductModel>> {
    try {
      const response = await ProductModelScheme.create(product)
      return ApiResponse.successResponse({
        message: ResponseMessages.Product.PRODUCT_ADDED.message,
        data: response,
        statusCode: ResponseMessages.Product.PRODUCT_ADDED.code,
      })
    } catch (error: any) {
      throw ApiResponse.errorResponse({
        message: ResponseMessages.General.ERROR.message,
        statusCode: ResponseMessages.General.ERROR.code,
        error: error.message,
      })
    }
  }

  async getProduct({ productId }: { productId: string }): Promise<ApiResponse<ProductModel>> {
    try {
      const id = new Types.ObjectId(productId)
      const response = await ProductModelScheme.findById({ _id: id })
      if (!response) {
        return ApiResponse.errorResponse({
          message: ResponseMessages.Product.PRODUCT_NOT_FOUND.message,
          statusCode: ResponseMessages.Product.PRODUCT_NOT_FOUND.code,
        })
      }
      return ApiResponse.successResponse({
        message: ResponseMessages.General.SUCCESS.message,
        data: response!,
        statusCode: ResponseMessages.General.SUCCESS.code,
      })
    } catch (error: any) {
      throw ApiResponse.errorResponse({
        message: ResponseMessages.General.ERROR.message,
        statusCode: ResponseMessages.General.ERROR.code,
        error: error.message,
      })
    }
  }

  async getAllProducts(): Promise<ApiResponse<ProductModel[]>> {
    try {
      const response: ProductModel[] = await ProductModelScheme.find()

      if (!response.length) {
        return ApiResponse.successResponse({
          message: ResponseMessages.Product.PRODUCT_NOT_FOUND.message,
          statusCode: ResponseMessages.Product.PRODUCT_NOT_FOUND.code,
          data: [],
        })
      }
      return ApiResponse.successResponse({
        message: ResponseMessages.Product.PRODUCT_FOUND.message,
        statusCode: ResponseMessages.Product.PRODUCT_FOUND.code,
        data: response,
      })
    } catch (error: any) {
      throw ApiResponse.errorResponse({
        message: ResponseMessages.General.ERROR.message,
        statusCode: ResponseMessages.General.ERROR.code,
        error: error.message,
      })
    }
  }
  async updateProduct(product: ProductModel & { productId: string }): Promise<ApiResponse<ProductModel>> {
    try {
      const { productId, ...updateData } = product
      const _id = new Types.ObjectId(productId)

      const productExist = await ProductModelScheme.findById({ _id })

      if (!productExist) {
        return ApiResponse.errorResponse({
          message: ResponseMessages.Product.PRODUCT_NOT_FOUND.message,
          statusCode: ResponseMessages.Product.PRODUCT_NOT_FOUND.code,
          error: "Product id is not valid",
        })
      }

      const response: ProductModel | null = await ProductModelScheme.findByIdAndUpdate(
        _id,
        {
          $set: updateData,
        },
        {
          new: true,
        },
      )
      console.log("🚀 ~ file: productRepoImple.ts:89 ~ ProductRepoImplementation ~ updateProduct ~ response:", response)

      if (!response) {
        return ApiResponse.errorResponse({
          message: ResponseMessages.General.ERROR.message,
          statusCode: ResponseMessages.General.ERROR.code,
          error:"Something went wrong while updating"
        })
      }
      return ApiResponse.successResponse({
        message: ResponseMessages.Product.PRODUCT_UPDATED.message,
        statusCode: ResponseMessages.Product.PRODUCT_UPDATED.code,
        data: response!,
      })
    } catch (error: any) {
      throw ApiResponse.errorResponse({
        message: ResponseMessages.General.ERROR.message,
        statusCode: ResponseMessages.General.ERROR.code,
        error: error.message,
      })
    }
  }
  async removeProduct({ productId }: { productId: string }): Promise<VoidApiResponse> {
    try {
      const _id = new Types.ObjectId(productId)

      const productExist = await ProductModelScheme.findById({ _id })

      if (!productExist) {
        return new VoidApiResponse({
          message: ResponseMessages.Product.PRODUCT_NOT_FOUND.message,
          statusCode: ResponseMessages.Product.PRODUCT_NOT_FOUND.code,
          success: false,
        })
      }
      const response = await ProductModelScheme.findByIdAndDelete(_id)

      if (!response) {
        throw new VoidApiResponse({
          message: ResponseMessages.General.ERROR.message,
          statusCode: ResponseMessages.General.ERROR.code,
          success: false,
        })
      }

      return new VoidApiResponse({
        message: ResponseMessages.Product.PRODUCT_DELETED.message,
        statusCode: ResponseMessages.Product.PRODUCT_DELETED.code,
        success: true,
      })
    } catch (error: any) {
      throw new VoidApiResponse({
        message: ResponseMessages.General.ERROR.message,
        statusCode: ResponseMessages.General.ERROR.code,
        success: false,
        error: error.message,
      })
    }
  }
}

export default ProductRepoImplementation
