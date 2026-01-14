import { getRestaurantById, getRestaurants, registerRestaurant } from "@/controllers"
import { Router } from "express"

const router = Router()

router.post("/restaurants", registerRestaurant)
router.get("/restaurants", getRestaurants)
router.get("/restaurants/:id", getRestaurantById)

export { router as AdminRoute}