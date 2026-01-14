
import { Restaurant } from "@prisma/client";

export const sanitizeRestaurant = (restaurant: Restaurant) => {
    const { password, salt, ...safeData } = restaurant;
    return safeData;
};