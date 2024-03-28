import { Dispatch, SetStateAction } from "react";

export type SetState<T> = Dispatch<SetStateAction<T>>;

export type UserLocation = {
    latitude: number;
    longitude: number;
};

export type CoffeeShop = {
    _id: number;
    name: string;
    mainImage: string;
    userImages: string[];
    latitude: number;
    longitude: number;
    city: string;
    totalRatings: number;
    rating: number;
    dogFriendly: boolean;
    dairyFree: boolean;
    hasSeating: boolean;
    description: string;
    distance?: string;
};

export type Region = {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
};

export type City = {
    _id: number;
    city: string;
    latitude: number;
    longitude: number;
    distance?: string;
};

export type CityRegions = Record<string, Region>;

export type CityShops = Record<string, CoffeeShop[]>;
