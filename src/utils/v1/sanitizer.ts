import { Restaurant } from "../../../prisma/generated/client";

export const sanitizeRestaurant = (restaurant: Restaurant) => {
  const { password, salt, ...safeData } = restaurant;
  return safeData;
};
