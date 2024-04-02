import { useState } from "react";
import { FlatList, View, Text, Button } from "react-native";
import { SearchBar } from "@rneui/base";

import { useCache } from "../contexts/Cache";

import { Props } from "./types";
import PostcodeSearch from "../components/PostcodeSearch";
import CitySelector from "../components/CitySelector";

export default function CitySearch({ navigation }: Props<"CitySearch">) {
    const { setCache } = useCache();
    const [postcode, setPostcode] = useState<boolean>(false);

    function changeCity(cityName: string) {
        setCache((currentCache) => {
            return { ...currentCache, currentCity: cityName };
        });

        navigation.goBack();
    }

    function handlePress() {
        setPostcode((current) => !current);
    }

    return (
        <View>
            {postcode ? (
                <PostcodeSearch changeCity={changeCity}></PostcodeSearch>
            ) : (
                <CitySelector changeCity={changeCity}></CitySelector>
            )}

            <Button title="Switch Input" onPress={handlePress}></Button>
        </View>
    );
}
