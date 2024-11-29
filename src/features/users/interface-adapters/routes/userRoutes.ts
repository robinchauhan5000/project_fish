import { Router } from "express"
import UserController from "../controllers/userController"

const router = Router()

const userController = new UserController()

router.get("/all", userController.getListOfUsers)
router.get("/user:id", userController.getUserById)
router.patch("/user/update:id", userController.updateUserById)
router.post("/user/delete:id", userController.deleteUserById)

export default router
