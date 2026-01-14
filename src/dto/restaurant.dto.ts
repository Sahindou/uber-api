import { isInternalDeclaration } from "typescript";

export interface CreateRestaurantInputs {
    name: string;
    ownerName: string;
    foodTypes: [string];
    postalcode: string;
    address: string;
    phone: string;
    email: string;
    password: string;
}

export interface LoginInputs {
    email: string
    password: string
}

export interface RestaurantPayload {
  id: string;
  name: string;
  ownerName: string;
  email: string;
  foodTypes: string[];
}
   
export interface EditRestaurantInputs {
    name: string;
    ownerName: string;
    foodTypes: [string];
    postalcode: string;
    address: string;
    phone: string;
}