import { NextFunction, Request, Response } from "express";
import { prisma } from "@/prisma/client"
import { CreateRestaurantInputs } from "@/dto";
import { generateSalt, hashPassword, sanitizeRestaurant} from "@/utility"

export const registerRestaurant = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const body = req.body as CreateRestaurantInputs;
        const existingRestaurant = await prisma.restaurant.findUnique({
            where: { email: body.email}
        });

        if (existingRestaurant) {
            // return res.status(400).json({ message: `Email '${body.email}' already exist` });
            return res.jsonError(`Email '${body.email}' already exist`, 400)
        }

        const salt = await generateSalt();
        const hashedPassword = await hashPassword(body.password, salt);

        const restaurant = await prisma.restaurant.create({
            data: { ...body, salt: salt, password: hashedPassword }
        });

        // return res.status(201).json(sanitizeRestaurant(restaurant));
        return res.jsonSuccess(restaurant, 201)
    }
    catch(error){
        next(error)
    }
}

export const getRestaurants = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const restaurants = await prisma.restaurant.findMany();

        if (!restaurants) {
            return res.jsonError("No restaurant found", 400)
        }

        const filterRestaurant =  restaurants.map(sanitizeRestaurant)

        return res.jsonSuccess(filterRestaurant, 200)
    } catch (error) {
        next(error);
    }
};

export const getRestaurantById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        if (Array.isArray(id)) {
            return res.jsonError("Invalid id parameter", 400)
        }

        const restaurant = await prisma.restaurant.findUnique({
            where: { id: id }
        });

        if (!restaurant) {
            return res.jsonError("Restaurant not found", 400)
        }

        return res.jsonSuccess(sanitizeRestaurant(restaurant), 200);
    } catch (error) {
        next(error);
    }
};
    