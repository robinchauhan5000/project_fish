import { Router } from "express"
import ProductController from "../controllers/productController"
import ProductRepoImplementation from "../../data/repositories/productRepoImplementation"
import ProductCategoryRepoImplementation from "../../data/repositories/productCategoryRepoimplementation"
import ProductCategoryController from "../controllers/productCategoryController"

const router = Router()

///Product Categories
const productCategoryRepo = new ProductCategoryRepoImplementation()

const productCategoryController = new ProductCategoryController(productCategoryRepo)

router.get("/category", productCategoryController.getAllProductCategory)
router.post("/addCategory", productCategoryController.addProductCategory)
router.post("/deleteCategory", productCategoryController.deleteProductCategory)

///Products routes
const productRepoImplementation = new ProductRepoImplementation()

const productController = new ProductController(productRepoImplementation)

router.post("/addProduct", productController.addProduct)
router.get("/getProduct", productController.getProduct)
router.get("/getAllProducts", productController.getAllProducts)
router.patch("/updateProduct", productController.updateProduct)
router.post("/deleteProduct", productController.removeProduct)

export default router
