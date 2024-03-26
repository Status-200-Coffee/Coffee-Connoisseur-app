import { useEffect, useState } from "react";
import { Button, View, ActivityIndicator } from "react-native";

import ShopMap from "../components/ShopMap";
import { getCities, getClosestCity, getShopsByCity } from "../api";

import { City, CoffeeShop, Region, UserLocation } from "../types";
import { Props } from "./types";
import { getUserLocation } from "../utils/location";

export default function ShopSearch({ navigation }: Props<"ShopSearch">) {
    const [loaded, setLoaded] = useState<boolean>(false);
    const [userLocation, setUserLocation] = useState<UserLocation>();
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [coffeeShops, setCoffeeShops] = useState<CoffeeShop[]>([]);
    const [city, setCity] = useState<string>("Carlisle");
    const [regions, setRegions] = useState<Record<string, Region>>({});
    const [region, setRegion] = useState<Region>({
        latitude: 54.8925,
        longitude: -2.9329,
        latitudeDelta: 0.04,
        longitudeDelta: 0.04,
    });

    useEffect(() => {
        getUserLocation(setUserLocation, setErrorMsg);
    }, []);

    useEffect(() => {
        if (!userLocation) return;

        getClosestCity(userLocation).then((city) => {
            setCity(city);
        });
    }, [userLocation]);

    useEffect(() => {
        getCities()
            .then((cities) => {
                const newRegions: Record<string, Region> = {};

                cities.map((city: City) => {
                    newRegions[city.city] = {
                        latitude: city.latitude,
                        longitude: city.longitude,
                        latitudeDelta: 0.04,
                        longitudeDelta: 0.04,
                    };
                });

                setRegions(newRegions);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        setLoaded(false);
        setRegion(regions[city]);

        getShopsByCity(city)
            .then((shops) => {
                setCoffeeShops(shops);
            })
            .catch((error) => {
                console.log(error, city);
            })
            .finally(() => {
                setLoaded(true);
            });
    }, [city]);

    function navSearch() {
        if (!loaded) {
            return;
        }

        navigation.navigate("CitySearch", { setCity });
    }

    function navMap() {
        if (!loaded) {
            return;
        }

        navigation.navigate("FullscreenMap", {
            coffeeShops,
            region,
            setRegion,
        });
    }

    if (!loaded) {
        return (
            <View className="h-5/6 flex justify-center">
                <ActivityIndicator size="large"></ActivityIndicator>
            </View>
        );
    }

    return (
        <View className="flex justify-items-center py-4">
            <Button title="City Search" onPress={navSearch}></Button>

            <View className="w-full h-60 my-8">
                <ShopMap
                    region={region}
                    setRegion={setRegion}
                    coffeeShops={coffeeShops}
                    userLocation={userLocation}
                    onPress={navMap}
                ></ShopMap>
            </View>

            <Button title="navigate" onPress={navMap}></Button>
        </View>
    );
}
