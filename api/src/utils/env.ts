import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().gte(1000),
  NODE_ENV: z
    .union([z.literal("development"), z.literal("production")])
    .default("development"),
});

const env = envSchema.parse(process.env);

export default env;
