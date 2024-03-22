import { Button, View } from "react-native";
import ShopMap from "../components/ShopMap";
import SearchField from "../components/SearchField";
import { useState } from "react";

interface ShopSearchProps {
    navigation: { navigate: (name: string) => void };
}

export default function ShopSearch(props: ShopSearchProps) {
    const navigation = props.navigation;
    console.log(navigation);

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

    function nav() {
        navigation.navigate("FullscreenMap");
    }

    return (
        <View className="flex justify-items-center py-4">
            <SearchField
                searchPhrase={searchPhrase}
                setSearchPhrase={setSearchPhrase}
                onSubmit={onSubmit}
            ></SearchField>

            <ShopMap
                initialRegion={initialRegion}
                coffeeShops={coffeeShops}
                width="full"
                height="48"
            ></ShopMap>

            <Button title="navigate" onPress={nav}></Button>
        </View>
    );
}
