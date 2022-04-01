import bcrypt from "bcrypt";

export const useHash = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const useCompare = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
