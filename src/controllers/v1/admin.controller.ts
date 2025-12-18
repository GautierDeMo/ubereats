import { NextFunction, Request, Response } from "express";
import { generateSalt, hashPassword, RequestValidator, sanitizeRestaurant } from "../../utils/v1";
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
}

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
}

export const registerRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) : Promise<any> => {
  try {
    const { errors, input } = await RequestValidator(CreateRestaurantDtoInputs, req.body)
    if (errors) return res.jsonError(errors)

    /** ancien moyen de récupérer un body, sans validation, mtn avec l'utils RequestValidator */
    // const body = req.body as CreateRestaurantDtoInputs // Casting en DTO

    const existingRestaurant = await prisma.restaurant.findUnique({
      where: { email: input.email }
    })
    if (existingRestaurant) {
      return res.jsonError(`Email: ${input.email} already exist`, 400)
      // return res.status(400).json({ message: `Email: ${input.email} already exist` })
    }

    const salt = await generateSalt()
    const hashedPassword = await hashPassword(input.password, salt)

    const restaurant = await prisma.restaurant.create({
      data: { ...input, salt: salt, password: hashedPassword}
    })
    return res.jsonSuccess(sanitizeRestaurant(restaurant), 201)
    // return res.status(201).json(sanitizeRestaurant(restaurant))
  } catch (error) {
    // erreur pas encore gérée, dans ce cas envoyée à la stack d'erreur vue plus tard
    next(error)
  }
}
