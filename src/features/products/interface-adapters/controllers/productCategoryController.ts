import { Request, Response } from "express"
import ProductCategoryRepository from "../../domain/repositories/productCategoryRepository"
import AddProductCategories from "../../domain/use_cases/category/addProductCategory"
import RemoveProductCategoryUseCase from "../../domain/use_cases/category/removeProductCategory"
import GetAllProductCategoryUsecase from "../../domain/use_cases/category/getAllProductCategory"

class ProductCategoryController {
  productCategoryRepository: ProductCategoryRepository

  constructor(productCategoryRepository: ProductCategoryRepository) {
    this.productCategoryRepository = productCategoryRepository
  }
  async addProductCategory(req: Request, res: Response) {
    const addProductCategory = new AddProductCategories(this.productCategoryRepository)
    try {
      const response: any = await addProductCategory.execute(req.body)
      res.status(response.statusCode).send(response)
    } catch (err: any) {
      res.status(err.statusCode).send(err)
    }
  }
  async deleteProductCategory(req: Request, res: Response) {
    const deleteProductCategory = new RemoveProductCategoryUseCase(this.productCategoryRepository)
    try {
      const response: any = await deleteProductCategory.execute(req.body)
      res.status(response.statusCode).send(response)
    } catch (err: any) {
      res.status(err.statusCode).send(err)
    }
  }
  async getAllProductCategory(req: Request, res: Response) {
    const addProductCategory = new GetAllProductCategoryUsecase(this.productCategoryRepository)
    try {
      const response: any = await addProductCategory.execute()
      res.status(response.statusCode).send(response)
    } catch (err: any) {
      res.status(err.statusCode).send(err)
    }
  }
}

export default ProductCategoryController
