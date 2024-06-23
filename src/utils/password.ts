import bcrypt from "bcrypt";

const saltRounds = process.env.BCRYPT_SALT_ROUNDS as string;

export const hashPassword = (password: string) => {
  return bcrypt.hashSync(password, +saltRounds);
};

export const comparePasswords = (hashed: string, password: string) => {
  const isMatched = bcrypt.compareSync(password, hashed);
  return isMatched;
};
