import { useEffect, useState } from "react";
import { Button, View, ActivityIndicator } from "react-native";

import ShopMap from "../components/ShopMap";
import ShopList from "../components/ShopList";
import { getShopsByCity } from "../utils/api";
import { useCache } from "../contexts/Cache";
import { RegionProvider } from "../contexts/Region";

import { Props } from "./types";

export default function ShopSearch({ navigation }: Props<"ShopSearch">) {
    const { cache, setCache } = useCache();
    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        setLoaded(false);

        const currentCity = cache.currentCity || "Carlisle";

        if (cache.cityShops[currentCity]) {
            setLoaded(true);
        } else {
            getShopsByCity(currentCity)
                .then((shops) => {
                    setCache((currCache) => {
                        const newCityShops = { ...currCache.cityShops };
                        newCityShops[currentCity] = shops;
                        return { ...currCache, cityShops: newCityShops };
                    });
                })
                .catch((error) => {
                    console.log(error, currentCity);
                })
                .finally(() => {
                    setLoaded(true);
                });
        }
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
        <View className="flex flex-col h-full">
            <Button title="City Search" onPress={navSearch}></Button>

            <View className="w-full h-1/5">
                <RegionProvider>
                    <ShopMap
                        navigation={navigation}
                        initialRegion={cache.cities[cache.currentCity!]}
                        onPress={navMap}
                    ></ShopMap>
                </RegionProvider>
            </View>

            {/* <Button title="navigate" onPress={navMap}></Button> */}

            <View className="flex-1 py-2">
                <ShopList navigation={navigation}></ShopList>
            </View>
        </View>
    );
}
