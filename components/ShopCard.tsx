import { Image, Text, View, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";

import { ShopCardProps } from "./types";

export default function ShopCard({ shop, navigation }: ShopCardProps) {
    return (
        <View className="flex-row border-2 rounded m-2 items-center bg-sky-100">
            <Image
                source={{ uri: shop.mainImage }}
                style={{ width: 150, height: 150, margin: 10 }}
            />
            <View className="flex-1 items-center">
                <Text className="font-bold leading-8 text-base">
                    {shop.name}
                </Text>
                <View className="flex-row items-center">
                    <Entypo name="location-pin" size={20} color="black" />
                    <Text className="text-base">
                        {shop.city} {shop.distance} km
                    </Text>
                </View>
                <Text className="font-bold leading-6 text-base">
                    {shop.rating} / 5
                </Text>
                <View className="flex-row m-0.5">
                    {(() => {
                        if (shop.dogFriendly) {
                            return (
                                <FontAwesome6
                                    name="dog"
                                    size={21}
                                    color="black"
                                />
                            );
                        }
                    })()}
                    {(() => {
                        if (shop.hasSeating) {
                            return (
                                <MaterialIcons
                                    name="chair"
                                    size={22}
                                    color="black"
                                />
                            );
                        }
                    })()}
                    {(() => {
                        if (shop.dairyFree) {
                            return (
                                <Entypo name="leaf" size={22} color="black" />
                            );
                        }
                    })()}
                </View>
                <Pressable
                    key={shop._id}
                    onPress={() =>
                        navigation.navigate("ShopPage", {
                            shop_id: shop._id,
                        })
                    }
                >
                    <Text className="m-2 p-2 bg-blue-900 text-center font-bold text-white rounded">
                        View Shop
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}
