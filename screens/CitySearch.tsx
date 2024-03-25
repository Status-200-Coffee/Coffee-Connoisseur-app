import { useState } from "react";
import { FlatList, View, Text } from "react-native";
import { SearchBar } from "@rneui/base";

import { Props } from "./types";

export default function CitySearch({ navigation, route }: Props<"CitySearch">) {
    const { setCity } = route.params;

    const allCities = ["Carlisle", "Newcastle"];

    const [input, setInput] = useState<string>("");
    const [filteredCities, setFilteredCities] = useState<string[]>([
        ...allCities,
    ]);

    function handleSearch(text: string) {
        setFilteredCities(
            allCities.filter((city) => {
                return city.toLowerCase().startsWith(text.toLowerCase());
            })
        );

        setInput(text);
    }

    function renderItem(title: string) {
        return (
            <View className=" border my-2 mx-4 p-2">
                <Text
                    className="text-xl text-center"
                    onPress={() => {
                        setCity(title);
                        navigation.goBack();
                    }}
                >
                    {title}
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
