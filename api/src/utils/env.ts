import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().gte(1000),
  NODE_ENV: z
    .union([z.literal("development"), z.literal("production")])
    .default("development"),

  POSTGRES_USER: z.string().min(2),
  POSTGRES_PASSWORD: z.string().min(8),
  POSTGRES_DB: z.string().min(2),
  POSTGRES_PORT: z.coerce.number().gte(5432),

  GOOGLE_CLIENT_ID: z.string().min(30),
  GOOGLE_CLIENT_SECRET: z.string().min(30),
  GOOGLE_CALLBACK_URL: z.string().min(30),
});

const env = envSchema.parse(process.env);

export default env;
