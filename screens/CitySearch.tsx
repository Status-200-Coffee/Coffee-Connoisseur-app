import { SearchBar } from "@rneui/base";
import { useState } from "react";
import { FlatList, View, Text } from "react-native";

interface CitySearchProps {
    navigation: any;
    route: any;
}

interface ItemProps {
    title: string;
    setCity: (city: string) => void;
    navigation: any;
}

function Item({ title, setCity, navigation }: ItemProps) {
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

const allCities = ["Carlisle", "Newcastle"];

export default function CitySearch(props: CitySearchProps) {
    const navigation = props.navigation;
    const { setCity } = props.route.params;

    const [input, setInput] = useState("");
    const [filteredCities, setFilteredCities] = useState([...allCities]);

    function handleSearch(text: string) {
        console.log(text);

        setFilteredCities(() => {
            return allCities.filter((city) => {
                return city.toLowerCase().startsWith(text.toLowerCase());
            });
        });

        setInput(text);
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
                renderItem={(item) => {
                    return (
                        <Item
                            title={item.item}
                            setCity={setCity}
                            navigation={navigation}
                        ></Item>
                    );
                }}
                keyExtractor={(item) => item}
            ></FlatList>
        </View>
    );
}
