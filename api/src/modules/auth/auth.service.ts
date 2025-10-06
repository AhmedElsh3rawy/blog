import AppError from "../../utils/appError";
import { comparePasswords } from "../../utils/password";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { usersService, UsersService } from "../users/users.service";

export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async register(dto: CreateUserDto) {
    try {
      const res = await this.userService.create(dto);
      return res;
    } catch (err) {
      throw new AppError(`Failed to register user ${err}`);
    }
  }

  async login() {}

  async validateLocalUser(email: string, password: string) {
    try {
      const user = await this.userService.findByEmail(email);
      if (!user) throw new AppError("Invalid credentials", 401);
      const matched = await comparePasswords(user.passwordHash, password);
      if (!matched) throw new AppError("Invalid credentials", 401);
      return user;
    } catch (err) {
      throw new AppError(`Failed to validate this user ${err}`);
    }
  }

  async validateJwtUser(id: number) {
    const user = await this.userService.findOne(id);
    if (!user) throw new AppError("User not found", 401);
    return user;
  }

  async refresh() {}
}

export const authService = new AuthService(usersService);
