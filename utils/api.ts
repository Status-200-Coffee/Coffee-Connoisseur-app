import axios from "axios";

import { City, CoffeeShop, UserLocation } from "../types";

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

export async function getClosestCity(user: UserLocation): Promise<string> {
    const { latitude, longitude } = user;
    const response = await api.get(`/cities`, {
        params: {
            lat: latitude,
            long: longitude,
        },
    });
    return response.data.city.city;
}
