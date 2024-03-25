import { Button, View } from "react-native";
import ShopMap from "../components/ShopMap";
import SearchField from "../components/SearchField";
import { useState } from "react";

import { shopData } from "../data/shops";

interface ShopSearchProps {
    navigation: { navigate: (name: string, params: Object) => void };
}

export default function ShopSearch(props: ShopSearchProps) {
    const navigation = props.navigation;

    const [searchPhrase, setSearchPhrase] = useState("");

    const initialRegions = [
        {
            latitude: 54.892374,
            longitude: -2.932819,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
        },
        // Carlisle 54.89237443360861, -2.9328197283288433
        {
            latitude: 54.978511,
            longitude: -1.617363,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
        },
        // Newcastle 54.978511087860866, -1.617363419991376
    ];
    const initialRegion = initialRegions[1];

    const coffeeShops = shopData["newcastle"];

    function onSubmit() {
        console.log(searchPhrase);
    }

    function navMap() {
        navigation.navigate("FullscreenMap", { initialRegion, coffeeShops });
    }

    const [city, setCity] = useState();
    function navSearch() {
        navigation.navigate("CitySearch", { setCity });
    }

    return (
        <View className="flex justify-items-center py-4">
            <Button title="City Search" onPress={navSearch}></Button>
            <SearchField
                searchPhrase={searchPhrase}
                setSearchPhrase={setSearchPhrase}
                onSubmit={onSubmit}
            ></SearchField>

            <View className="w-full h-60">
                <ShopMap
                    initialRegion={initialRegion}
                    coffeeShops={coffeeShops}
                    onPress={navMap}
                ></ShopMap>
            </View>
            <Button title="navigate" onPress={navMap}></Button>

            {/* <View className="w-full h-72"></View> */}
        </View>
    );
}
