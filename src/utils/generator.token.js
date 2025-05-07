import jwt from 'jsonwebtoken';

export const generatorAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_KEY, {
    expiresIn: process.env.ACCESS_TOKEN_TIME,
  });
};

export const generatorRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_KEY, {
    expiresIn: process.env.REFRESH_TOKEN_TIME,
  });
};
