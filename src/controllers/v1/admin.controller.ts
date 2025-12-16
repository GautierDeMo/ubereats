import { NextFunction, Request, Response } from "express";
import { generateSalt, hashPassword, sanitizeRestaurant } from "../../utils/v1";
import { CreateRestaurantDtoInputs } from "../../dtos/v1";
import { prisma } from "../../orm/v1";

export const getRestaurants = async (
  req: Request,
  res: Response,
  next: NextFunction
) : Promise<any> => {
  try {
    const restaurants = await prisma.restaurant.findMany();
    if (!restaurants.length) {
      return res.jsonError('No restaurants found', 404);
      // return res.status(404).json({ message: 'No restaurants found' });
    };
    return res.jsonSuccess(restaurants.map(sanitizeRestaurant), 200);
    // return res.status(200).json(restaurants.map(sanitizeRestaurant));
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
    const { id } = req.params;
    if (id) {
      const restaurant = await prisma.restaurant.findUnique({
        where: { id: id }
      });
      if (!restaurant) {
        return res.jsonError('Restaurant not found', 404);
        // return res.status(404).json({ message: 'Restaurant not found' });
      };
      return res.jsonSuccess(sanitizeRestaurant(restaurant), 200)
    };
  } catch (error) {
    next(error);
  }
};

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
      return res.jsonError(`Email: ${body.email} already exist`, 400);
      // return res.status(400).json({ message: `Email: ${body.email} already exist` })
    }

    const salt = await generateSalt();
    const hashedPassword = await hashPassword(body.password, salt);

    const restaurant = await prisma.restaurant.create({
      data: { ... body, salt: salt, password: hashedPassword}
    });
    return res.jsonSuccess(sanitizeRestaurant(restaurant), 201);
    // return res.status(201).json(sanitizeRestaurant(restaurant));
  } catch (error) {
    // erreur pas encore gérée, dans ce cas envoyée à la stack d'erreur vue plus tard
    next(error);
  }
};
