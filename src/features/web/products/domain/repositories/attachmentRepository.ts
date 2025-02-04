import ApiResponse from "../../../../../application/utils/apiResponse"
import VoidApiResponse from "../../../../../application/utils/voidApiSuccessResponse"
import { AttachmentModel } from "../../data/models/attachmentModel"
import { ProductModel } from "../../data/models/productModel"

abstract class AttachmentRepository {
  abstract addProductImage(attachmentModel: AttachmentModel): Promise<ApiResponse<AttachmentModel>>
  abstract removeProductImage({ productImageId }: { productImageId: string }): Promise<ApiResponse<AttachmentModel>>
}

export default AttachmentRepository
