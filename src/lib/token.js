import jwt from "jsonwebtoken";

export const signToken = (payload, expire) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is requied");
  }
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expire,
  });
};
