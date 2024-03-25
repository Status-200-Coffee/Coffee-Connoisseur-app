import { Button, View } from "react-native";
import ShopMap from "../components/ShopMap";
import { useEffect, useState } from "react";

import { shopData } from "../data/shops";

interface ShopSearchProps {
    navigation: { navigate: (name: string, params: Object) => void };
}

export default function ShopSearch(props: ShopSearchProps) {
    const navigation = props.navigation;

    const [searchPhrase, setSearchPhrase] = useState("");
    const [city, setCity] = useState<"Carlisle" | "Newcastle">("Carlisle");

    const initialRegions = {
        Carlisle: {
            latitude: 54.892374,
            longitude: -2.932819,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
        },
        // Carlisle 54.89237443360861, -2.9328197283288433
        Newcastle: {
            latitude: 54.978511,
            longitude: -1.617363,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
        },
        // Newcastle 54.978511087860866, -1.617363419991376
    };

    const [region, setRegion] = useState(initialRegions[city]);

    let coffeeShops = shopData[city];

    useEffect(() => {
        setRegion(initialRegions[city]);
        coffeeShops = shopData[city];
    }, [city]);

    function onSubmit() {
        console.log(searchPhrase);
    }

    function navMap() {
        navigation.navigate("FullscreenMap", {
            region,
            setRegion,
            coffeeShops,
        });
    }

    function navSearch() {
        navigation.navigate("CitySearch", { setCity });
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

            {/* <View className="w-full h-72"></View> */}
        </View>
    );
}
