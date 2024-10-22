
import { Response } from "express";
import { UserEntity } from "../../../domain/entities/user";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import bcrypt from 'bcryptjs';
import UserModel from "../../../infrastructure/data/models/userModel";

interface RegisterUserRequest {
  firstName: string, lastName: string, phoneNumber: string,
}

export class RegisterUser {
  constructor(private userRepository: UserRepository) { }

  async execute(request: RegisterUserRequest): Promise<UserModel> {
    const { firstName, lastName, phoneNumber } = request;
    const user = new UserEntity(firstName, lastName, phoneNumber);
    return await this.userRepository.save(user);
  }
}


