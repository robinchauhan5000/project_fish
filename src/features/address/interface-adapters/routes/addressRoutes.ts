import { Router } from "express"
import AddressController from "../controllers/addressController"
import UserRepositoryImpl from "../../data/repositories/UserRepositoryImpl"

const router = Router()
const userResposotry = new UserRepositoryImpl()
const userController = new AddressController(userResposotry)

router.get("/all", userController.getListOfUsers)
router.get("/:id", userController.getUserById)
router.patch("/update:id", userController.updateUserById)
router.post("/delete:id", userController.deleteUserById)

export default router
