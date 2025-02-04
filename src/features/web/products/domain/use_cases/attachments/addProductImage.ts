import ApiResponse from "../../../../../../application/utils/apiResponse"
import GenericUsecase from "../../../../../../application/utils/genricUsecase"
import { AttachmentModel } from "../../../data/models/attachmentModel"
import { ProductCategoryModel } from "../../../data/models/productCategoryModel"
import AttachmentRepository from "../../repositories/attachmentRepository"
import ProductCategoryRepository from "../../repositories/productCategoryRepository"

class AddProductImageUsecase extends GenericUsecase<AttachmentModel, AttachmentModel> {
  attachmentRepo: AttachmentRepository

  constructor(attachmentRepo: AttachmentRepository) {
    super()
    this.attachmentRepo = attachmentRepo
  }

  execute(request: AttachmentModel): Promise<ApiResponse<AttachmentModel>> {
    return this.attachmentRepo.addProductImage(request)
  }
}

export default AddProductImageUsecase
