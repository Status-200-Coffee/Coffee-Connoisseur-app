import { useEffect, useState } from "react";
import {
    Button,
    View,
    ActivityIndicator,
    ScrollView,
    Pressable,
    Text,
} from "react-native";

import ShopMap from "../components/ShopMap";
import ShopList from "../components/ShopList";
import { useCache } from "../contexts/Cache";
import { RegionProvider } from "../contexts/Region";
import { getShopsByCity } from "../utils/api";

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
            getShopsByCity(currentCity, "", "")
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
            <View className="h-5/6 flex justify-center bg-white">
                <ActivityIndicator size="large"></ActivityIndicator>
            </View>
        );
    }

    return (
        <ScrollView className="flex flex-col h-full bg-white">
            <View className="w-full h-64">
                <RegionProvider>
                    <ShopMap
                        navigation={navigation}
                        initialRegion={cache.cities[cache.currentCity!]}
                        onPress={navMap}
                    ></ShopMap>
                </RegionProvider>
            </View>
            <View className="justify-center bg-blue-900 rounded-full mx-8 my-3 p-2">
                <Pressable onPress={navSearch}>
                    <Text className="text-center text-base text-white font-bold">
                        City Search
                    </Text>
                </Pressable>
            </View>
            <View className="flex-1 py-2">
                <ShopList
                    shopList={cache.cityShops[cache.currentCity!]}
                    navigation={navigation}
                ></ShopList>
            </View>
        </ScrollView>
    );
}
