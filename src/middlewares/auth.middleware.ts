import { RestaurantPayload } from "@/dto";
import { getEnvVariable, extractToken } from "@/utility";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

declare module "express-serve-static-core" {
    interface Request {
        user?: RestaurantPayload;
    }
}

export const authMiddleware = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const auth = req.headers.authorization

        if(!auth) return res.jsonError("Missing authorization header", 403)
        
        const token = extractToken(auth)
        if(!token) return res.jsonError("Invalid authorization header", 403)
        
        const payload = jwt.verify(token, getEnvVariable("JWT_SECRET")) as RestaurantPayload

        req.user = payload

        next()
    }
    catch(error) {next(error)}
}