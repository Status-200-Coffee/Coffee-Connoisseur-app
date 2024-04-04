import { useState, useEffect, useMemo } from "react";
import { View, Pressable, Text } from "react-native";
import RadioGroup, { RadioButtonProps } from "react-native-radio-buttons-group";
import { MaterialIcons, Octicons } from "@expo/vector-icons";
import { CheckBox } from "@rneui/base";

import ShopCard from "./ShopCard";
import { useCache } from "../contexts/Cache";
import { getShopsByCity } from "../utils/api";

import { ShopListProps } from "./types";
import { CoffeeShop } from "../types";

export default function ShopList({ navigation }: ShopListProps) {
    const { cache } = useCache();
    const [shopList, setShopList] = useState<CoffeeShop[]>(
        cache.cityShops[cache.currentCity!]
    );
    const [queryString, setQueryString] = useState("");
    const [filterPressed, setFilterPressed] = useState(false);
    const [sortByPressed, setSortByPressed] = useState(false);
    const [dogFriendlyChecked, setDogFriendlyChecked] = useState(false);
    const [dairyFreeChecked, setDairyFreeChecked] = useState(false);
    const [hasSeatingChecked, setHasSeatingChecked] = useState(false);
    const [sortBy, setSortBy] = useState("distance");
    const radioButtons: RadioButtonProps[] = useMemo(
        () => [
            { id: "distance", label: "Distance (Closest)", value: "distance" },
            { id: "rating", label: "Rating (Highest)", value: "rating" },
        ],
        []
    );

    const clearFilters = () => {
        setDogFriendlyChecked(false);
        setDairyFreeChecked(false);
        setHasSeatingChecked(false);
        setQueryString("");
    };

    const clearSortBy = () => {
        setSortBy("distance");
    };

    const handleFilters = () => {
        let queries = "";
        if (dogFriendlyChecked) {
            queries += "&dogFriendly=true";
        }
        if (dairyFreeChecked) {
            queries += "&dairyFree=true";
        }
        if (hasSeatingChecked) {
            queries += "&hasSeating=true";
        }
        setQueryString(queries);
    };

    useEffect(() => {
        const { latitude, longitude } = cache.userLocation!;
        let sort = `&sortBy=distance&orderBy=asc&long=${longitude}&lat=${latitude}`;
        if (sortBy === "rating") {
            sort = "&sortBy=rating&orderBy=desc";
        }
        getShopsByCity(`${cache.currentCity}`, queryString, sort).then(
            (shops) => {Refactored favourite button.
                setShopList(shops);
            }
        );
        setFilterPressed(false);
        setSortByPressed(false);
    }, [queryString, sortBy]);

    return (
        <View className="flex flex-col h-full">
            <View className="flex-row justify-center justify-evenly">
                <Pressable onPress={() => setFilterPressed(!filterPressed)}>
                    <View className="items-center">
                        <Text className="font-bold text-xl">Filters</Text>
                        <MaterialIcons
                            name="filter-list"
                            size={25}
                            color="black"
                        />
                    </View>
                    {filterPressed ? (
                        <View>
                            <CheckBox
                                title="Dog Friendly"
                                checked={dogFriendlyChecked}
                                onPress={() =>
                                    setDogFriendlyChecked(!dogFriendlyChecked)
                                }
                            ></CheckBox>
                            <CheckBox
                                title="Dairy Free Options"
                                checked={dairyFreeChecked}
                                onPress={() =>
                                    setDairyFreeChecked(!dairyFreeChecked)
                                }
                            ></CheckBox>
                            <CheckBox
                                title="Seating Available"
                                checked={hasSeatingChecked}
                                onPress={() =>
                                    setHasSeatingChecked(!hasSeatingChecked)
                                }
                            ></CheckBox>
                            <Pressable onPress={handleFilters}>
                                <Text className="m-2 p-2 bg-blue-900 text-center font-bold text-white rounded">
                                    Apply Filters
                                </Text>
                            </Pressable>
                            <Pressable onPress={clearFilters}>
                                <Text className="m-2 p-2 bg-red-900 text-center font-bold text-white rounded">
                                    Clear All Filters
                                </Text>
                            </Pressable>
                        </View>
                    ) : null}
                </Pressable>
                <Pressable onPress={() => setSortByPressed(!sortByPressed)}>
                    <View className="items-center">
                        <Text className="font-bold text-xl">Sort By</Text>
                        <Octicons name="sort-desc" size={23} color="black" />
                    </View>
                    {sortByPressed ? (
                        <View>
                            <RadioGroup
                                radioButtons={radioButtons}
                                onPress={setSortBy}
                                selectedId={sortBy}
                            />
                            <Pressable onPress={clearSortBy}>
                                <Text className="m-2 p-2 bg-red-900 text-center font-bold text-white rounded">
                                    Reset
                                </Text>
                            </Pressable>
                        </View>
                    ) : null}
                </Pressable>
            </View>
            {shopList.map((shop) => {
                return (
                    <View key={shop._id}>
                        <ShopCard shop={shop} navigation={navigation} />
                    </View>
                );
            })}
        </View>
    );
}
