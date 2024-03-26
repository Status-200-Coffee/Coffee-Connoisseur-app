import { useEffect, useState } from "react";
import { Button, View, ActivityIndicator } from "react-native";

import ShopMap from "../components/ShopMap";
import { getShopsByCity } from "../utils/api";
import { useCache } from "../contexts/Cache";
import { RegionProvider } from "../contexts/Region";

import { Props } from "./types";
import { Region } from "../types";

export default function ShopSearch({ navigation }: Props<"ShopSearch">) {
    const { cache, setCache } = useCache();
    const [loaded, setLoaded] = useState<boolean>(false);
    const [cityRegion, setCityRegion] = useState<Region>({
        latitude: 52.2345,
        longitude: -2.6543,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
    });

    useEffect(() => {
        setLoaded(false);

        const currentCity = cache.currentCity || "Carlisle";

        getShopsByCity(currentCity)
            .then((shops) => {
                setCache((currCache) => {
                    const newCityShops = { ...currCache.cityShops };
                    newCityShops[currentCity] = shops;
                    return { ...currCache, cityShops: newCityShops };
                });

                setCityRegion(cache.cities[currentCity]);
            })
            .catch((error) => {
                console.log(error, currentCity);
            })
            .finally(() => {
                setLoaded(true);
            });
    }, [cache.currentCity]);

    function navSearch() {
        if (!loaded) {
            return;
        }

        navigation.navigate("CitySearch");
    }

    function navMap() {
        if (!loaded) {
            return;
        }

        navigation.navigate("FullscreenMap");
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
                <RegionProvider>
                    <ShopMap
                        initialRegion={cityRegion}
                        onPress={navMap}
                    ></ShopMap>
                </RegionProvider>
            </View>

            <Button title="navigate" onPress={navMap}></Button>
        </View>
    );
}
