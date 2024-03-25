import axios, { AxiosError } from "axios";
import { CoffeeShop } from "./types";

const api = axios.create({
    baseURL: "https://coffee-connoisseur-api.onrender.com/api",
});

export async function getShopsByCity(city: string): Promise<CoffeeShop[]> {
    return api
        .get(`/shops/${city}`)
        .then((response) => {
            return response.data.shops;
        })
        .catch((error) => {
            console.log(error);
        });
}
