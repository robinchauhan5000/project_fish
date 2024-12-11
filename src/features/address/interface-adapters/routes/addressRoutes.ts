import { Router } from "express"
import AddressController from "../controllers/addressController"
import AddressRepositoryImpl from "../../data/repositories/AddressRepositoryImpl"

const router = Router()
const addressResposotry = new AddressRepositoryImpl()
const addressController = new AddressController(addressResposotry)

router.get("/all", addressController.getListOfAddress)
router.patch("/update:id", addressController.updateAddressById)
router.post("/delete:id", addressController.deleteAddressById)

export default router
