import { Router } from "express"
import CartController from "../controllers/cartController"
import CartRepositoryImpl from "../../data/repositories/CartRepositoryImpl"

const router = Router()
const CartResposotry = new CartRepositoryImpl()
const cartController = new CartController(CartResposotry)

router.get("/getCart", cartController.getCart)
router.post("/addItem", cartController.addItemInCart)
router.patch("/removeItem", cartController.removeItemInCart)

export default router
