import { z } from "zod";

export const updateUserDtoSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
});

export type UpdateUserDto = z.infer<typeof updateUserDtoSchema>;
