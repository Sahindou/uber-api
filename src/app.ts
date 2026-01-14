import express from "express"
import {AdminRoute, RestaurantRoute, ShoppingRoute} from "./routes/index"
import { errorHandlerMiddleware, jsonApiResponseMiddleware } from "./middlewares";

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(jsonApiResponseMiddleware); 

app.use("/admin", AdminRoute)
app.use("/restaurant", RestaurantRoute)
app.use("/shopping", ShoppingRoute)

app.use(errorHandlerMiddleware)

app.listen(8000, () => {
    console.log("Server is runing at http:localhost:8000")
})