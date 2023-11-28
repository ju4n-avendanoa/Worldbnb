import bcrypt from "bcryptjs";

async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  const passHashed = await bcrypt.hash(password, salt);
  return passHashed;
}

export default hashPassword;
