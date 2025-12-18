import { NextFunction, Request, Response } from "express";
import { CreateFoodDtoInputs, EditRestaurantDtoInputs, loginDtoInputs } from "../../dtos/v1";
import { prisma } from "../../orm/v1";
import { generateSignature, isValidPassword, sanitizeRestaurant } from "../../utils/v1";
import { uploadImagesMiddleware } from "../../middlewares/v1";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) : Promise<any> => {
  try {
    const body = req.body as loginDtoInputs;
    const restaurant = await prisma.restaurant.findUnique({ where: { email: body.email }});
    if (!restaurant) return res.jsonError("Restaurant not found", 404);
    const { id, name, ownerName, email, password, foodTypes, salt } = restaurant

    const isPasswordValid = await isValidPassword(body.password, password, salt);
    if (!isPasswordValid) {
      return res.jsonError("Invalid credentials", 401)
    }

    const token = generateSignature({
      id, name, ownerName, email, foodTypes
    })

    return res.jsonSuccess({ token });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction) : Promise<any> => {
  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: req.user?.id! }
    })
    if (!restaurant) return res.jsonError("Restaurant not found", 404);
    return res.jsonSuccess(sanitizeRestaurant(restaurant));
  } catch (error) {
    next(error);
  }
}

export const updateRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) : Promise<any> => {
  console.log("Début de la fonction d'update")
  try {
    const body = req.body as EditRestaurantDtoInputs;
    if (!body) return res.jsonError('Missing body in request', 400);
    const { name, ownerName, foodTypes, address, phone } = body;
    if (!name && !ownerName && !foodTypes && !address && !phone) return res.jsonError('Missing fields in body request', 400);

    const id = req.user?.id;
    if (!id) return res.jsonError('Missing restaurant id', 400);

    const restaurant = await prisma.restaurant.findUnique({
      where: { id: id }
    });
    if (!restaurant) return res.jsonError('Restaurant not found', 404);


    const updatedRestaurant = await prisma.restaurant.update({
      where: { id: id },
      data: {
        address: address!,
        foodTypes: foodTypes!,
        name: name!,
        ownerName: ownerName!,
        phone: phone!
      }
    });
    return res.jsonSuccess(sanitizeRestaurant(updatedRestaurant), 200);
  } catch (error) {
    next(error);
  }
};

export const updateServiceAvailable = async (
  req: Request,
  res: Response,
  next: NextFunction
) : Promise<any> => {
  try {
    const id = req.user?.id;
    if (!id) return res.jsonError('Missing restaurant id', 400)

    const restaurant = await prisma.restaurant.findUnique({
      where: { id: id }
    })
    if (!restaurant) return res.jsonError('Restaurant not found', 404)

    const updatedRestaurant = await prisma.restaurant.update({
      where: { id: id },
      data: { serviceAvailable: !restaurant.serviceAvailable }
    })
    return res.jsonSuccess(sanitizeRestaurant(updatedRestaurant), 200)
  } catch (error) {
    next(error)
  }
};

export const updateCoverImages = [
  uploadImagesMiddleware,
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) : Promise<any> => {
    try {
      const id = req.user?.id
      if (!id) return res.jsonError('Missing restaurant id', 400)

      const restaurant = await prisma.restaurant.findUnique({
        where: { id: id }
      })
      if (!restaurant) return res.jsonError('Restaurant not found', 404)

      const files = req.files as Express.Multer.File[]
      const images = files.map(file => file.filename)

      restaurant.coverImages.push(...images)
      if (typeof id === 'string') {
        const updatedRestaurant = await prisma.restaurant.update({
          where: { id: id },
          data: { coverImages: restaurant.coverImages }
        })
        return res.jsonSuccess(sanitizeRestaurant(updatedRestaurant))
      }
    } catch (error) {
      next(error)
    }
  }
]

export const addFood = [
  uploadImagesMiddleware,
  async (
  req: Request,
  res: Response,
  next: NextFunction
) : Promise<any> => {
  try {
    const id = req.user?.id;
    if (!id) return res.jsonError('Missing restaurant id', 400)

    const body = JSON.parse(req.body.data) as CreateFoodDtoInputs
    if (!body) return res.jsonError('Missing restaurant body', 400)

    const restaurant = await prisma.restaurant.findUnique({
      where: { id: id }
    })
    if (!restaurant) return res.jsonError('Restaurant not found', 404)

    const files = req.files as Express.Multer.File[]
    const images = files.map(file => file.filename)

    if (body.readyTime) {
      const food = await prisma.food.create({
        data: { ...body, images, restaurantId: id! }
      })
      return res.jsonSuccess(food, 201)
    }
  } catch (error) {
    next(error)
  }
}]
