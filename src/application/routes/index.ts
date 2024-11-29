import express from "express"
import authRoutes from "../../features/auth/interface-adapters/routes/authRoutes"

import userRoutes from "../../features/users/interface-adapters/routes/userRoutes"

const App = express()

App.use("/api/auth", authRoutes)
App.use("/api/user", userRoutes)

export default App
