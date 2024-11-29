import { Router } from "express"
import AuthController from "../../interface-adapters/controllers/authController"

const router = Router()

const authController = new AuthController()

router.post("/register", authController.register)
router.post("/login", authController.login)

export default router
