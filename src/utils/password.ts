import bcrypt from "bcrypt";

const saltRounds = process.env.BCRYPT_SALT_ROUNDS as string;

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, +saltRounds);
};

export const comparePasswords = async (hashed: string, password: string) => {
  const isMatched = await bcrypt.compare(password, hashed);
  return isMatched;
};
