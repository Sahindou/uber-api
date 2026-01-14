import { CreateFoodInputs, EditRestaurantInputs, LoginInputs } from "@/dto";
import { prisma } from "@/prisma/client";
import { Prisma } from "@prisma/client";
import {
  isValidPassword,
  generateSignature,
  sanitizeRestaurant,
} from "@/utility";
import { Request, Response, NextFunction } from "express";

// récuperation de tous les resto dispo dans sa ville + les plats. apres mettre en forme le tableau des plats en forme normal et extration des données 
export const getAvailableDishesByCity = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const cp = req.params.cp as string;

    const restaurants = await prisma.restaurant.findMany({
      where: {
        serviceAvailable: true,
        postalcode: cp,
      },
      include: { foods: true },
    }) as Prisma.RestaurantGetPayload<{ include: { foods: true } }>[];

    const allFoods = restaurants.flatMap((res) => res.foods.map(item => item.name));

    res.jsonSuccess(allFoods)
  } catch (error) {
    next(error);
  }
};

export const getTopRatedRestaurantsByCity = async (
    req: Request,
    res: Response,
    next: NextFunction
) : Promise<any> => {
    try {
        const cp = req.params.cp as string

        const restaurants = await prisma.restaurant.findMany({
          where: {
            postalcode: cp,
            serviceAvailable: true
          },
          orderBy: {rating: 'desc'},
          take: 5
        })

        const formatData = restaurants.map(item => sanitizeRestaurant(item))

        res.jsonSuccess(formatData)
    } catch (error) {
        next(error);
    }
};

export const getQuickReadyDishes = async (
    req: Request,
    res: Response,
    next: NextFunction
) : Promise<any> => {
    try {
        const cp = req.params.cp as string

        const restaurants = await prisma.restaurant.findMany({
      where: {
        serviceAvailable: true,
        postalcode: cp,
      },
      include: { foods: true },
    }) as Prisma.RestaurantGetPayload<{ include: { foods: true } }>[];

        const foods = (await restaurants).map(res => res.foods )

       

        res.jsonSuccess(foods)
    } catch (error) {
        next(error);
    }
};

export const searchDishByName = async (
    req: Request,
    res: Response,
    next: NextFunction
) : Promise<any> => {
    try {
       const cp = req.params.cp as string

       const searchName = req.query.searchName as string | undefined

        if (!searchName || !cp) {
          return res.status(400).json({ message: 'name et cp sont requis' })
        }

        const dishes = await prisma.food.findMany({
          where: {
            name: {
              startsWith: searchName,
              mode: 'insensitive'
            },
            restaurant: {
              postalcode: cp
            }
          },
          take: 20
        })

        res.jsonSuccess(dishes)
    } catch (error) {
        next(error);
    }
};