import { Router } from "express";
import { getAvailableDishesByCity, getTopRatedRestaurantsByCity, getQuickReadyDishes, searchDishByName } from "@/controllers/";



const router = Router()


router.get("/foods/:cp", getAvailableDishesByCity) // Voir la liste des plats disponibles dans sa ville
router.get("/best-resto/:cp", getTopRatedRestaurantsByCity) // voir le top resto 
router.get("/fast-foods/:cp", getQuickReadyDishes)
router.get("/foods-name/:cp", searchDishByName)


export { router as ShoppingRoute};