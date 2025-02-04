import dontenv from "dotenv"
import Bootstrap from "../src/infrastructure/server/bootstrapServer"
import AppRoutes from "../src/application/routes/index"
import JwtGenerator from "./application/utils/jwtGenerator"

dontenv.config()

const port = process.env.PORT || 3000
const mongoURI = process.env.MONGO__URI || ""

;(() => {
  new Bootstrap({ port, router: AppRoutes, mongoURI: mongoURI })
})()

console.log(
  "🚀 ~ file: index.ts:16 ~ JwtGenerator.generateToken:",
  JwtGenerator.generateToken("674b173ab95c5058f1fbf3b4"),
)
