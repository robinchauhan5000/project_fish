import { Router } from "express"
import UserController from "../controllers/userController"
import UserRepositoryImpl from "../../data/repositories/UserRepositoryImpl"

const router = Router()
const userResposotry = new UserRepositoryImpl()
const userController = new UserController(userResposotry)

router.get("/all", userController.getListOfUsers)
router.get("/user:id", userController.getUserById)
router.patch("/update", userController.updateUserById)
router.post("/user/delete:id", userController.deleteUserById)




export default router
