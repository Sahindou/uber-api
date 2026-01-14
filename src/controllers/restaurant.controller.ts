import { CreateFoodInputs, EditRestaurantInputs, LoginInputs } from "@/dto";
import { prisma } from "@/prisma/client";
import {
  isValidPassword,
  generateSignature,
  sanitizeRestaurant,
} from "@/utility";
import { Request, Response, NextFunction } from "express";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { email, password } = req.body as LoginInputs;

    const restaurant = await prisma.restaurant.findUnique({ where: { email } });
    if (!restaurant) return res.jsonError("Restaurant not found", 404);

    const isPasswordValid = await isValidPassword(
      password,
      restaurant.password,
      restaurant.salt
    );
    if (!isPasswordValid) return res.jsonError("Invalid credentials", 401);

    const token = generateSignature({
      id: restaurant.id,
      name: restaurant.name,
      ownerName: restaurant.ownerName,
      email: restaurant.email,
      foodTypes: restaurant.foodTypes,
    });

    return res.jsonSuccess({ token: token });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    if (!req.restaurant) return res.jsonError("Restaurant not found", 404);

    return res.jsonSuccess(req.restaurant);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    if (!req.restaurant) return res.jsonError("Unauthorized", 401);

    const { id } = req.restaurant;
    const { name, ownerName, foodTypes, postalcode, address, phone } =
      req.body as EditRestaurantInputs;

    const restaurant = await prisma.restaurant.update({
      where: { id },
      data: { name, ownerName, foodTypes, postalcode, address, phone },
    });

    res.jsonSuccess(sanitizeRestaurant(restaurant), 201);
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
        if(!req.restaurant)  return res.jsonError("Unauthorized", 401)

        const  updateRestaurant = await prisma.restaurant.update({
            where: {id: req.restaurant.id},
            data: { serviceAvailable: !req.restaurant?.serviceAvailable}
        })

        return res.jsonSuccess(sanitizeRestaurant(updateRestaurant))
    } catch (error) {
        next(error);
    }
};

export const updateCoverImages = async (
    req: Request,
    res: Response,
    next: NextFunction
) : Promise<any> => {
    try {
        if(!req.restaurant) return res.jsonError("Unauthorized", 401)

        const files = req.files as Express.Multer.File[]
        const images = files.map(file => file.filename)

        req.restaurant.coverImages.push(...images)

        const updateRestaurant = await prisma.restaurant.update({
          where: {id: req.restaurant.id},
          data: { coverImages: req.restaurant.coverImages}
        })

        return res.jsonSuccess(sanitizeRestaurant(updateRestaurant))
    } catch (error) {
        next(error);
    }
};

export const addFood = async (
    req: Request,
    res: Response,
    next: NextFunction
) : Promise<any> => {
    try {

      if(!req.restaurant) return null
      
      const body = req.body as CreateFoodInputs;

     
      const files = req.files as Express.Multer.File[];
      const images = files.map(file => file.filename);

      const food = await prisma.food.create({
        data: { ...body, images, restaurantId: req.restaurant.id }
      });

      return res.jsonSuccess(food);
    } catch (error) {
        next(error);
    }
};

export const getAllFoods = async (
    req: Request,
    res: Response,
    next: NextFunction
) : Promise<any> => {
    try {
        
    } catch (error) {
        next(error);
    }
};
