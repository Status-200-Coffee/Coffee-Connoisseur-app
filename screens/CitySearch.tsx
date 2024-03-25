import { ListItem, SearchBar } from "@rneui/base";
import { useState } from "react";
import { FlatList, View, Text } from "react-native";

interface CitySearchProps {
    route: any;
}

interface ItemProps {
    title: string;
}

function Item({ title }: ItemProps) {
    return (
        <View>
            <Text>{title}</Text>
        </View>
    );
}

export default function CitySearch(props: CitySearchProps) {
    const { setCity } = props.route.params;

    const [input, setInput] = useState("");

    const cities = ["Carlisle", "Newcastle", "Manchester", "Leeds", "London"];

    return (
        <View>
            <SearchBar></SearchBar>

            <FlatList
                data={cities}
                renderItem={(item) => <Item title={item}></Item>}
                keyExtractor={(item) => item}
            ></FlatList>
        </View>
    );
}
