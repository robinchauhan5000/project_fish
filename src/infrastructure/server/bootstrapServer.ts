import express, { Router } from "express"
import expressPinoLogger from "express-pino-logger"
import MongoDbConnection from "../services/mongodb/mongoDbConnection"
import firebaseInitialize from "../services/firebase/firebase"
import { logger } from "../../application/utils/logger"

class BootstrapServer {
  constructor({ router, port, mongoURI }: { router: Router; port: string | number; mongoURI: string }) {
    const app = express()

    app.use(express.json())

    app.use(expressPinoLogger({ logger: logger }))

    new MongoDbConnection({ mongoURI })

    firebaseInitialize()

    app.listen(port, () => {
      console.log(`Listening on port ${port}`)
    })

    app.get("/health", (_req, res) => {
      res.send("Server is working fine")
    })

    app.use("/", router)
  }
}

export default BootstrapServer
