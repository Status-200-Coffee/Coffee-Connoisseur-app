import { View } from "react-native";
import ShopMap from "./ShopMap";
import SearchField from "./SearchField";
import { useState } from "react";

export default function ShopSearch() {
    const [searchPhrase, setSearchPhrase] = useState("");

    const initialRegion = {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.08,
        longitudeDelta: 0.08,
    };

    const coffeeShops = [
        {
            latitude: 37.779,
            longitude: -122.43,
        },
        {
            latitude: 37.789,
            longitude: -122.435,
        },
        {
            latitude: 37.7904,
            longitude: -122.432,
        },
    ];

    function onSubmit() {
        console.log(searchPhrase);
    }

    return (
        <View>
            <SearchField
                searchPhrase={searchPhrase}
                setSearchPhrase={setSearchPhrase}
                onSubmit={onSubmit}
            ></SearchField>

            <ShopMap
                initialRegion={initialRegion}
                coffeeShops={coffeeShops}
                width="full"
                height="full"
            ></ShopMap>
        </View>
    );
}
