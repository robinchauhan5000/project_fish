import { Request, Response } from "express";
import { UserRepositoryImpl } from "../../infrastructure/data/repositories/UserRepositoryImpl";
import { RegisterUser } from "../../application/use-cases/auth/registerUser";
import { LoginUser } from "../../application/use-cases/auth/loginUser";

const userRepository = new UserRepositoryImpl();

export const register = async (req: Request, res: Response) => {
  const registerUser = new RegisterUser(userRepository);
  try {
    await registerUser.execute(req.body);
    res.status(201).send("User registered successfully");
  } catch (err: any) {
    res.status(400).send(err.message);
  }
};

export const login = async (req: Request, res: Response) => {
  const loginUser = new LoginUser(userRepository);
  try {
    const result = await loginUser.execute(req.body);
    res.status(200).json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
