
import { UserRepository } from "../../../domain/repositories/UserRepository";
import bcrypt from 'bcryptjs';
import { generateToken } from "../../../infrastructure/services/jwtService";

interface LoginUserRequest {
  username: string;
  password: string;
}

interface LoginUserResponse {
  token: string;
}

export class LoginUser {
  constructor(private userRepository: UserRepository) {}

  async execute(request: LoginUserRequest): Promise<LoginUserResponse> {
    const { username, password } = request;
    const user = await this.userRepository.findByUsername(username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid username or password");
    }

    const token = generateToken(user.id);
    return { token };
  }
}
