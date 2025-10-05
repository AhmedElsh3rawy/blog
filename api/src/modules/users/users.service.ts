import { eq } from "drizzle-orm";
import { db } from "../../config/database/db";
import { users } from "../../config/database/schema";
import logger from "../../config/logger";
import AppError from "../../utils/appError";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { hashPassword } from "../../utils/password";

export class UsersService {
  async create(createUserDto: CreateUserDto) {
    const user = await this.findByEmail(createUserDto.email);
    if (user) {
      throw new AppError("Email is already in use", 400);
    }
    try {
      const hashed = await hashPassword(createUserDto.password);
      const res = await db
        .insert(users)
        .values({ ...createUserDto, passwordHash: hashed })
        .returning();
      return res[0];
    } catch (err) {
      throw new AppError(`Failed to create user ${err}`);
    }
  }

  async findAll() {
    try {
      return await db.select().from(users);
    } catch (err) {
      throw new AppError(`Failed to get all users ${err}`, 500);
    }
  }

  async findOne(id: number) {
    try {
      const [user] = await db.select().from(users).where(eq(users.id, id));
      return user || null;
    } catch (err) {
      throw new AppError(`Failed to get user ${err}`);
    }
  }

  async findByEmail(email: string) {
    try {
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, email));
      return user || null;
    } catch (err) {
      throw new AppError(`Failed to get user by email ${err}`);
    }
  }

  async findByName(name: string) {
    try {
      const [user] = await db.select().from(users).where(eq(users.name, name));
      return user || null;
    } catch (err) {
      throw new AppError(`Failed to get user by name ${err}`);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const [user] = await db
        .update(users)
        .set({ ...updateUserDto })
        .where(eq(users.id, id))
        .returning();
      return user;
    } catch (err) {
      throw new AppError(`Failed to update user ${err}`);
    }
  }

  async remove(id: number) {
    try {
      const [user] = await db.delete(users).where(eq(users.id, id)).returning();
      return user;
    } catch (err) {
      logger.error(err);
      throw new AppError(`Faild to remove user ${err}`);
    }
  }
}
