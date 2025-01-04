import {Request, Response  } from "express";
import ProductRepository from "../../domain/repositories/productRepository"
import AddProductUsecase from "../../domain/use_cases/addProductUsecase"
import RemoveProductUsecase from "../../domain/use_cases/removeProductUsecase";

class ProductController {
  productRepository: ProductRepository
  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository
  }

  addProduct = async (req: Request, res: Response) => {
    const addProduct = new AddProductUsecase(this.productRepository)
    try {
      const response = await addProduct.execute(req.body)
      res.status(201).send(response)
    } catch (err: any) {
      res.status(400).send(err.message)
    }
  }

  removeProduct = async (req: Request, res: Response) => {
    try {
      const removeProduct = new RemoveProductUsecase(this.productRepository)

      const response = await removeProduct.execute({ id: req.body.id })
      res.status(200).send(response)
    } catch (err: any) {
      res.status(400).send(err.message)
    }
  }

  updateProduct = async (req: Request, res: Response) => {
    const addItem = new AddItemInCartUseCase(this.cartResposotry)
    try {
      const response = await addItem.execute(req.body)
      res.status(201).send(response)
    } catch (err: any) {
      res.status(400).send(err.message)
    }
  }

  getProduct = async (req: Request, res: Response) => {
    const addItem = new AddItemInCartUseCase(this.cartResposotry)
    try {
      const response = await addItem.execute(req.body)
      res.status(201).send(response)
    } catch (err: any) {
      res.status(400).send(err.message)
    }
  }

  getAllProducts = async (req: Request, res: Response) => {
    const addItem = new AddItemInCartUseCase(this.cartResposotry)
    try {
      const response = await addItem.execute(req.body)
      res.status(201).send(response)
    } catch (err: any) {
      res.status(400).send(err.message)
    }
  }
}
