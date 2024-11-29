import express, { Router } from "express"
import admin from "firebase-admin"
import MongoDbConnection from "../services/mongodb/mongoDbConnection"
import firebaseInitialize from "../services/firebase/firebase"

class BootstrapServer {
  constructor({ router, port, mongoURI }: { router: Router; port: string | number; mongoURI: string }) {
    const app = express()

    app.use(express.json())

    new MongoDbConnection({ mongoURI })

    if (!admin.apps.length) {
      firebaseInitialize()
    }

    app.get("/health", (_req, res) => {
      res.send("Server is working fine")
    })

    app.listen(port, () => {
      console.log(`Listening on port ${port}`)
    })

    app.use("/", router)
  }
}

export default BootstrapServer
