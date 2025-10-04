import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().gte(1000),
  NODE_ENV: z
    .union([z.literal("development"), z.literal("production")])
    .default("development"),

  POSTGRES_USER: z.string().nonempty(),
  POSTGRES_HOST: z.string().nonempty(),
  POSTGRES_PASSWORD: z.string().nonempty(),
  POSTGRES_DB: z.string().nonempty(),
  POSTGRES_PORT: z.coerce.number().gte(5432),

  GOOGLE_CLIENT_ID: z.string().nonempty(),
  GOOGLE_CLIENT_SECRET: z.string().nonempty(),
  GOOGLE_CALLBACK_URL: z.string().nonempty(),
});

const env = envSchema.parse(process.env);

export default env;
