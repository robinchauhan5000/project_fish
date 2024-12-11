import express from "express"
import authRoutes from "../../features/auth/interface-adapters/routes/authRoutes"

import userRoutes from "../../features/users/interface-adapters/routes/userRoutes"

import addressRoutes from "../../features/address/interface-adapters/routes/addressRoutes";

const App = express()

App.use("/api/auth", authRoutes)
App.use("/api/user", userRoutes)
App.use("/api/address", addressRoutes)

export default App
