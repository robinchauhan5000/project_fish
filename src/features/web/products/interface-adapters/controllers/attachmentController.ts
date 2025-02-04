import { Request, Response } from "express"
import ProductCategoryRepository from "../../domain/repositories/productCategoryRepository"
import AddProductCategories from "../../domain/use_cases/category/addProductCategory"
import RemoveProductCategoryUseCase from "../../domain/use_cases/category/removeProductCategory"
import GetAllProductCategoryUsecase from "../../domain/use_cases/category/getAllProductCategory"
import AttachmentRepository from "../../domain/repositories/attachmentRepository"
import AddProductImageUsecase from "../../domain/use_cases/attachments/addProductImage"
import RemoveProductImageUseCase from "../../domain/use_cases/attachments/removeProductImage"

class AttachmentController {
  private attachmentRepo: AttachmentRepository

  constructor(attachmentRepo: AttachmentRepository) {
    this.attachmentRepo = attachmentRepo
  }
  addProductImage = async (req: Request, res: Response) => {
    const addProductCategory = new AddProductImageUsecase(this.attachmentRepo)
    try {
      const response: any = await addProductCategory.execute(req.body)
      res.status(response.statusCode).send(response)
    } catch (err: any) {
      res.status(err.statusCode).send(err)
    }
  }
  removeProductImage = async (req: Request, res: Response) => {
    const deleteProductCategory = new RemoveProductImageUseCase(this.attachmentRepo)
    try {
      const response: any = await deleteProductCategory.execute(req.body)
      res.status(response.statusCode).send(response)
    } catch (err: any) {
      res.status(err.statusCode).send(err)
    }
  }
}

export default AttachmentController
