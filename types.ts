import { Dispatch, SetStateAction } from "react";

export type SetState<T> = Dispatch<SetStateAction<T>>;

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
};

export type Region = {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
};

export type City = Record<string, Region>;

export type CityShops = Record<string, CoffeeShop[]>;

export type ShopMapProps = {
    region: Region;
    setRegion: SetState<Region>;
    coffeeShops: CoffeeShop[];
    onPress?: () => void;
};
