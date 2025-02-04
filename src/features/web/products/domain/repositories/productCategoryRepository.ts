import ApiResponse from "../../../../../application/utils/apiResponse"
import VoidApiResponse from "../../../../../application/utils/voidApiSuccessResponse"
import { ProductCategoryModel } from "../../data/models/productCategoryModel"

abstract class ProductCategoryRepository {
  abstract getAllProductCategoriesList(): Promise<ApiResponse<ProductCategoryModel[]>>
  abstract addProductCategories(productCategory: ProductCategoryModel): Promise<ApiResponse<ProductCategoryModel>>
  abstract removeProductCategories({ categoryId }: { categoryId: string }): Promise<VoidApiResponse>
}

export default ProductCategoryRepository
