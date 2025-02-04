import { Router } from "express"
import ProductController from "../controllers/productController"
import ProductRepoImplementation from "../../data/repositories/productRepoImplementation"
import ProductCategoryRepoImplementation from "../../data/repositories/productCategoryRepoimplementation"
import ProductCategoryController from "../controllers/productCategoryController"
import AttachmentController from "../controllers/attachmentController"
import AttachmentRepoImplementation from "../../data/repositories/attachmentRepositoryImplementation"

const router = Router()

const productRepoImplementation = new ProductRepoImplementation()

const productController = new ProductController(productRepoImplementation)
///Product Categories
const productCategoryRepo = new ProductCategoryRepoImplementation()

const productCategoryController = new ProductCategoryController(productCategoryRepo)

const attachmentRepo = new AttachmentRepoImplementation()

const attachmentController = new AttachmentController(attachmentRepo)

router.post("/add", productController.addProduct)
router.get("/get", productController.getProduct)
router.get("/getAll", productController.getAllProducts)
router.patch("/update", productController.updateProduct)
router.post("/delete", productController.removeProduct)

router.get("/category/all", productCategoryController.getAllProductCategory)
router.post("/category/add", productCategoryController.addProductCategory)
router.post("/category/delete", productCategoryController.deleteProductCategory)

//attachment routes

router.post("/attachment/upload", attachmentController.addProductImage)
router.post("/attachment/remove", attachmentController.removeProductImage)
///Products routes

export default router

