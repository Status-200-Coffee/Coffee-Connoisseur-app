import axios from "axios";

import { City, CoffeeShop, User, UserLocation } from "../types";

const api = axios.create({
    baseURL: "https://coffee-connoisseur-api.onrender.com/api",
});
const postcodesApi = axios.create({
    baseURL: "https://api.postcodes.io/postcodes/",
});

export async function getShopsByCity(
    city: string,
    queryString: string,
    sort: string
): Promise<CoffeeShop[]> {
    const searchString = `/shops/${city}?${queryString}${sort}`;
    const response = await api.get(searchString);
    return response.data.shops;
}

export async function getCities(): Promise<City[]> {
    const response = await api.get("/cities");
    return response.data.cities;
}

export async function getClosestCity(user: UserLocation): Promise<string> {
    const { latitude, longitude } = user;
    const response = await api.get("/cities", {
        params: {
            lat: latitude,
            long: longitude,
        },
    });
    return response.data.city.city;
}

export async function getCoordsOfPostcode(
    postcode: string
): Promise<UserLocation | null> {
    const response = await postcodesApi.get(postcode);

    if (response.status === 404) {
        return null;
    }

    const { latitude, longitude } = response.data.result;
    return { latitude, longitude };
}

export async function getUser(username: string): Promise<User> {
    const response = await api.get(`/users/${username}`);

    return response.data.user;
}

export async function uploadPhotoToUser(username: string, newPhotoUrl: string) {
    try {
        const response = await axios.patch(
            `https://coffee-connoisseur-api.onrender.com/api/users/${username}`,
            { newPhoto: newPhotoUrl }
        );
        console.log("Photo uploaded successfully to user:", username);
    } catch (error) {
        console.error("Error updating photo for user:", username, ":", error);
    }
}

export async function uploadPhotoToShop(
    city: string,
    shop_id: number,
    newPhotoUrl: string
): Promise<CoffeeShop> {
    try {
        const response = await axios.patch(
            `https://coffee-connoisseur-api.onrender.com/api/shops/${city}/${shop_id}`,
            { newPhoto: newPhotoUrl }
        );
        console.log(
            "Photo uploaded successfully to shop:",
            shop_id,
            "in city:",
            city
        )
        return response.data.shop
    } catch (error) {
        console.error(
            "Error updating photo for shop:",
            shop_id,
            "in city:",
            city,
            ":",
            error
        );
    }
}
