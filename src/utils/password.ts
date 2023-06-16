import bcrypt from "bcrypt";

const BCRYPT_SALT_ROUNDS = 12;

const hashPassword = async(password: string) => {
  const salt = await bcrypt.genSalt(BCRYPT_SALT_ROUNDS);
  const hashedPass = await bcrypt.hash(password, salt);
  return hashedPass
};

const verifyPassword = async(password: string, hashedPass: string) => {
  const result = await bcrypt.compare(password, hashedPass);
  return result
};

export { hashPassword, verifyPassword };