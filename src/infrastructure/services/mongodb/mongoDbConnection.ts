import mongoose from "mongoose"

class MongoDbConnection {
  constructor({ mongoURI }: { mongoURI: string }) {
    if (mongoURI === "") {
      throw new Error("Please pass mongoDb connection string")
    }

    this.connectDB(mongoURI)
  }

  async connectDB(mongoURI: string) {
    try {
      await mongoose.connect(mongoURI)
      console.log("MongoDB is connected")
    } catch (err: any) {
      console.error(err.message)
      process.exit(1)
    }
  }
}

export default MongoDbConnection
