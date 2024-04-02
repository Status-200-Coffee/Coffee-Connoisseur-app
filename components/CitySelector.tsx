import { useState } from "react";
import { FlatList, Text, View } from "react-native";
import { SearchBar } from "@rneui/base";

import { useCache } from "../contexts/Cache";

import { CitySelectorProps } from "./types";

export default function CitySelector({ changeCity }: CitySelectorProps) {
    const { cache } = useCache();

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
        <View className="flex-grow">
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
