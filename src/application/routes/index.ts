import express from "express"
import authRoutes from "../../features/auth/interface-adapters/routes/authRoutes"

import userRoutes from "../../features/users/interface-adapters/routes/userRoutes"

import addressRoutes from "../../features/address/interface-adapters/routes/addressRoutes";
import cartRoutes from "../../features/cart/interface-adapters/routes/cartRoutes";

const App = express()

App.use("/api/auth", authRoutes)
App.use("/api/user", userRoutes)
App.use("/api/address", addressRoutes)
App.use("/api/cart", cartRoutes)

export default App
