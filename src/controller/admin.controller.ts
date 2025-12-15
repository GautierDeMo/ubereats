import { NextFunction, Request, Response } from "express";
import { CreateRestaurantDtoInputs } from "../dtos/restaurant.dto.js";
import { prisma } from "../orm/client.js";
import { generateSalt, hashPassword } from "../utils/password-utility.js";

export const registerRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) : Promise<any> => {
  try {
    const body = req.body as CreateRestaurantDtoInputs; // Casting en DTO

    const existingRestaurant = await prisma.restaurant.findUnique({
      where: { email: body.email }
    });
    if (existingRestaurant) {
      return res.status(400).json({ message: `Email: ${body.email} already exist` })
    }

    const salt = await generateSalt();
    const hashedPassword = await hashPassword(body.password, salt);

    const restaurant = await prisma.restaurant.create({
      data: { ... body, salt: salt, password: hashedPassword}
    });
    return res.status(201).json(restaurant);
  } catch (error) {
    next(error);
  }
};

export const getRestaurants = async (
  req: Request,
  res: Response,
  next: NextFunction
) : Promise<any> => {
  try {

  } catch (error) {
    next(error);
  }
};

export const getRestaurantById = async (
  req: Request,
  res: Response,
  next: NextFunction
) : Promise<any> => {
  try {

  } catch (error) {
    next(error);
  }
};
