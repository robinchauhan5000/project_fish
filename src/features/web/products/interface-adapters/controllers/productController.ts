import { Request, Response } from "express"
import ProductRepository from "../../domain/repositories/productRepository"
import AddProductUsecase from "../../domain/use_cases/products/addProductUsecase"
import RemoveProductUsecase from "../../domain/use_cases/products/removeProductUsecase"
import UpdateProductUsecase from "../../domain/use_cases/products/updateProductUsecase"
import GetSingleProductUsecase from "../../domain/use_cases/products/getSingleProductUsecase"
import GetAllProductsUsecase from "../../domain/use_cases/products/getAllProductUsecase"

class ProductController {
  productRepository: ProductRepository
  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository
  }

  addProduct = async (req: Request, res: Response) => {
    const addProduct = new AddProductUsecase(this.productRepository)
    try {
      const response: any = await addProduct.execute(req.body)
      res.status(response.statusCode).send(response)
    } catch (err: any) {
      res.status(err.statusCode).send(err)
    }
  }

  removeProduct = async (req: Request, res: Response) => {
    try {
      const removeProduct = new RemoveProductUsecase(this.productRepository)

      const response: any = await removeProduct.execute({ productId: req.body.productId })
      res.status(response.statusCode).send(response)
    } catch (err: any) {
      res.status(err.statusCode).send(err.message)
    }
  }

  updateProduct = async (req: Request, res: Response) => {
    const updateProduct = new UpdateProductUsecase(this.productRepository)
    try {
      console.log("🚀 ~ file: productController.ts:40 ~ ProductController ~ updateProduct= ~ req.body:", req.body)

      const response: any = await updateProduct.execute(req.body)
      res.status(response.statusCode).send(response)
    } catch (err: any) {
      res.status(err.statusCode).send(err)
    }
  }

  getProduct = async (req: Request, res: Response) => {
    const getProduct = new GetSingleProductUsecase(this.productRepository)
    try {
      const response: any = await getProduct.execute(req.body)
      res.status(response.statusCode).send(response)
    } catch (err: any) {
      res.status(err.statusCode).send(err)
    }
  }

  getAllProducts = async (_req: Request, res: Response) => {
    const getAllProduct = new GetAllProductsUsecase(this.productRepository)
    try {
      const response: any = await getAllProduct.execute()
      res.status(response.statusCode).send(response)
    } catch (err: any) {
      res.status(err.statusCode).send(err)
    }
  }
}

export default ProductController
