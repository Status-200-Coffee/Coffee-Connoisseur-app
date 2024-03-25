import { useEffect, useState } from "react";
import { Button, View } from "react-native";

import ShopMap from "../components/ShopMap";
import { shopData } from "../data/shops";
import { initialRegions } from "../data/cities";

import { CoffeeShop, Region } from "../types";
import { Props } from "./types";

export default function ShopSearch({ navigation }: Props<"ShopSearch">) {
    const [city, setCity] = useState<string>("Carlisle");
    const [region, setRegion] = useState<Region>(initialRegions[city]);
    const [coffeeShops, setCoffeeShops] = useState<CoffeeShop[]>(
        shopData[city]
    );

    useEffect(() => {
        setRegion(initialRegions[city]);
        setCoffeeShops(shopData[city]);
    }, [city]);
    
    function navSearch() {
        navigation.navigate("CitySearch", { setCity });
    }

    function navMap() {
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
        </View>
    );
}
