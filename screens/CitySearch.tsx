import { useState } from "react";
import { View, Button } from "react-native";

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
        <View className="flex flex-col h-full">
            {postcode ? (
                <PostcodeSearch changeCity={changeCity}></PostcodeSearch>
            ) : (
                <CitySelector changeCity={changeCity}></CitySelector>
            )}

            <Button
                title={postcode ? "City Select" : "Postcode"}
                onPress={handlePress}
            ></Button>
        </View>
    );
}
