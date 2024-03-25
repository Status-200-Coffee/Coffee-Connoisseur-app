import { useEffect, useState } from "react";
import { Button, View, Text } from "react-native";

import ShopMap from "../components/ShopMap";
import { shopData } from "../data/shops";
import { initialRegions } from "../data/cities";
import { getShopsByCity } from "../api";

import { CoffeeShop, Region } from "../types";
import { Props } from "./types";

export default function ShopSearch({ navigation }: Props<"ShopSearch">) {
    const [loaded, setLoaded] = useState<boolean>(false);
    const [city, setCity] = useState<string>("Carlisle");
    const [region, setRegion] = useState<Region>(initialRegions[city]);
    const [coffeeShops, setCoffeeShops] = useState<CoffeeShop[]>(
        shopData[city]
    );

    useEffect(() => {
        setLoaded(false);
        setRegion(initialRegions[city]);

        getShopsByCity(city).then((shops) => {
            setCoffeeShops(shops);
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

    return (
        <View className="flex justify-items-center py-4">
            <Button title="City Search" onPress={navSearch}></Button>

            <View className="w-full h-60 my-8">
                <ShopMap
                    region={region}
                    setRegion={setRegion}
                    coffeeShops={coffeeShops}
                    onPress={navMap}
                ></ShopMap>
            </View>

            <Button title="navigate" onPress={navMap}></Button>

            {loaded || <Text className="text-align-center">Loading...</Text>}
        </View>
    );
}
