import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { extractToken, getEnvVariable } from "../../utils/v1";
import { RestaurantPayload } from "../../dtos/v1";

declare module 'express-serve-static-core' {
  interface Request {
    user?: RestaurantPayload
  }
}

export const authenticationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) return res.jsonError("Missing authorization header", 403);

    const token = extractToken(authorization);
    if(!token) return res.jsonError("Invalid authorization header", 403);

    const payload = jwt.verify(token, getEnvVariable('JWT_SECRET')) as RestaurantPayload;
    req.user = payload;
    next();
  } catch (error) {
    if(error instanceof jwt.TokenExpiredError) return res.jsonError('Token has expired', 401);
    if(error instanceof jwt.JsonWebTokenError) return res.jsonError('Invalid token', 401);
    next(error)
  }
}
