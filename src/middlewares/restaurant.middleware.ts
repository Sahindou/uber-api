import { RestaurantPayload } from "@/dto";
import { sanitizeRestaurant } from "@/utility";
import { NextFunction, Request, Response } from "express";
import { prisma } from "@/prisma/client";

declare module "express-serve-static-core" {
  interface Request {
    user?: RestaurantPayload;
    restaurant?: {
      id: string;
      email: string;
      name: string;
      ownerName: string;
      foodTypes: string[];
      postalcode: string;
      address: string;
      phone: string;
      serviceAvailable: boolean;
      coverImages: string[];
      rating: number;
      createdAt: Date;
    };
  }
}

export const restaurantMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    if (!req.user) return res.jsonError("Invalid authorization header", 403);

    const restaurant = await prisma.restaurant.findUnique({
      where: { id: req.user?.id },
    });

    if (!restaurant) return res.jsonError("Restaurant not found", 404);

    req.restaurant = sanitizeRestaurant(restaurant)

    next();
  } catch (error) {
    next(error);
  }
};
