import axios from "axios";
import { City, CoffeeShop } from "./types";

const api = axios.create({
    baseURL: "https://coffee-connoisseur-api.onrender.com/api",
});

export async function getShopsByCity(city: string): Promise<CoffeeShop[]> {
    const response = await api.get(`/shops/${city}`);
    return response.data.shops;
}

export async function getCities(): Promise<City[]> {
    const response = await api.get("/cities");
    return response.data.cities;
}
