import bcrypt from 'bcrypt';

export const encode = async (data, salt) => {
  const hashed = await bcrypt.hash(data, salt);
  return hashed;
};

export const decode = async (data, hashed) => {
  const isMatch = await bcrypt.compare(data, hashed);
  return isMatch;
};
