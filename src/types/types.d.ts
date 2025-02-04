import { UserModel } from "../src/features/users/data/models/userModel" // Adjust the path as necessary
import { Request } from "express"

declare global {
  namespace Express {
    export interface Request {
      user?: UserModel // Add the type of user as per your model
    }
  }
}

// export {} // Ensure this file is treated as a module
