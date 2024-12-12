import { Router } from "express"
import AddressController from "../controllers/addressController"
import AddressRepositoryImpl from "../../data/repositories/AddressRepositoryImpl"

const router = Router()
const addressResposotry = new AddressRepositoryImpl()
const addressController = new AddressController(addressResposotry)

router.get("/all", addressController.getListOfAddress)
router.post("/save", addressController.saveAddress)
router.patch("/update", addressController.updateAddressById)
router.post("/delete", addressController.deleteAddressById)

export default router
