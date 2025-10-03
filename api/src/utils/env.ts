import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().gte(1000),
  NODE_ENV: z
    .union([z.literal("development"), z.literal("production")])
    .default("development"),
  POSTGRES_USER: z.string().min(2),
  POSTGRES_PASSWORD: z.string().min(8),
  POSTGRES_DB: z.string().min(2),
  POSTGRES_PORT: z.number().gte(5432),
});

const env = envSchema.parse(process.env);

export default env;
