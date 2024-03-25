import { Dispatch, SetStateAction } from "react";

export type SetState<T> = Dispatch<SetStateAction<T>>;

export type CoffeeShop = {
    latitude: number;
    longitude: number;
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
