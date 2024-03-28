import { useState } from "react";
import { FlatList, View, Text } from "react-native";
import { SearchBar } from "@rneui/base";

import { useCache } from "../contexts/Cache";

import { Props } from "./types";

export default function CitySearch({ navigation }: Props<"CitySearch">) {
    const { cache, setCache } = useCache();

    const allCities = Object.keys(cache.cities);

    const [input, setInput] = useState<string>("");
    const [filteredCities, setFilteredCities] = useState<string[]>([
        ...allCities,
    ]);

    function handleSearch(text: string) {
        setInput(text);
        setFilteredCities(
            allCities.filter((city) => {
                return city.toLowerCase().startsWith(text.toLowerCase());
            })
        );
    }

    function changeCity(cityName: string) {
        setCache((currentCache) => {
            return { ...currentCache, currentCity: cityName };
        });

        navigation.goBack();
    }

    function renderItem(cityName: string) {
        return (
            <View className=" border my-2 mx-4 p-2">
                <Text
                    className="text-xl text-center"
                    onPress={() => changeCity(cityName)}
                >
                    {cityName}
                </Text>
            </View>
        );
    }

    return (
        <View>
            <SearchBar
                placeholder="Enter name of city"
                value={input}
                onChangeText={handleSearch}
                autoCorrect={false}
            ></SearchBar>

            <FlatList
                className="flex-col flex-nowrap"
                data={filteredCities}
                renderItem={({ item }) => renderItem(item)}
                keyExtractor={(item) => item}
            ></FlatList>
        </View>
    );
}
