import { Router } from "express";
import { getProfile, login, updateProfile, updateServiceAvailable, updateCoverImages, addFood, getRestaurantById } from "@/controllers/";
import {authMiddleware, restaurantMiddleware, uploadImagesMiddleware} from "@/middlewares"

const router = Router();

router.post("/login", login);
router.get("/:id", getRestaurantById)
router.use(authMiddleware); // en cas de plusieurs routes proteger
router.get("/profile", restaurantMiddleware, getProfile)
router.patch("/profile", restaurantMiddleware, updateProfile)
router.patch("/profile/service-available", restaurantMiddleware, updateServiceAvailable)
router.patch("/profile/cover-images", restaurantMiddleware, uploadImagesMiddleware, updateCoverImages);
router.post("/foods", restaurantMiddleware, addFood);

export { router as RestaurantRoute };