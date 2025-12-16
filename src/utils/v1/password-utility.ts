import bcrypt from "bcrypt";
import { RestaurantPayload } from "../../dtos/v1";
import { getEnvVariable } from "./variable";
import jwt from 'jsonwebtoken';

export const extractToken = (authorization: string) => {
  const [prefix, token] = authorization.split(' ');
  const prefixes = ['Bearer', 'Basic', 'JWT'];
  if(prefix && !prefixes.includes(prefix)) return null;
  return token;
}

export const generateSalt = async () => {
  return bcrypt.genSalt();
};

export const generateSignature = (payload: RestaurantPayload) => {
  const JWT_SECRET = getEnvVariable("JWT_SECRET");
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' })
}

export const hashPassword = async (password: string, salt: string) => {
  return bcrypt.hash(password, salt);
};

export const isValidPassword = async (enteredPassword: string, savedPassword: string, salt: string) => {
  return await hashPassword(enteredPassword, salt) === savedPassword;
}
