import express from "express"
import authRoutes from "../../features/auth/interface-adapters/routes/authRoutes"

import userRoutes from "../../features/web/users/interface-adapters/routes/userRoutes"

import addressRoutes from "../../features/mobile/address/interface-adapters/routes/addressRoutes"
import cartRoutes from "../../features/mobile/cart/interface-adapters/routes/cartRoutes"
import productRoutes from "../../features/web/products/interface-adapters/routes/productRoutes"
import AuthMiddleware from "../middlewares/authMiddleware"

const App = express()

App.use("/api/auth", authRoutes)
App.use("/api/user", userRoutes)
App.use("/api/address", AuthMiddleware.authenticateToken, addressRoutes)
App.use("/api/cart", cartRoutes)
App.use("/api/product", productRoutes)

export default App
