import ApiResponse from "../../../../../../application/utils/apiResponse"
import GenericUsecase from "../../../../../../application/utils/genricUsecase"
import { AttachmentModel } from "../../../data/models/attachmentModel"
import AttachmentRepository from "../../repositories/attachmentRepository"

class RemoveProductImageUseCase extends GenericUsecase<{ productImageId: string }, AttachmentModel> {
  attachmentRepo: AttachmentRepository

  constructor(attachmentRepo: AttachmentRepository) {
    super()
    this.attachmentRepo = attachmentRepo
  }
  execute(request: { productImageId: string }): Promise<ApiResponse<AttachmentModel>> {
    return this.attachmentRepo.removeProductImage(request)
  }
}

export default RemoveProductImageUseCase
