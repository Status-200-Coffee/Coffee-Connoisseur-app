import { Image, Text, View, Pressable } from "react-native";
import { MaterialIcons, FontAwesome6, Entypo } from "@expo/vector-icons";

import FavouriteButton from "./FavouriteButton";

import { ShopCardProps } from "./types";

export default function ShopCard({ shop, navigation }: ShopCardProps) {
    return (
        <View className="flex-row border-2 border-slate-700 rounded m-2 items-center bg-sky-100">
            <Image
                source={{ uri: shop.mainImage.image }}
                alt={shop.mainImage.altText}
                style={{ width: 150, height: 150, margin: 10 }}
            />
            <View className="flex-1 items-center">
                <Text className="font-bold leading-8 text-base">
                    {shop.name}
                </Text>
                <View className="flex-row items-center">
                    <Entypo name="location-pin" size={20} color="black" />
                    <Text className="text-base">{shop.city}</Text>
                    <Text className="text-base mr-2">
                        {" "}
                        {shop.distance ? `${shop.distance} km` : null}
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
                                    color="brown"
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
                                    color="darkblue"
                                />
                            );
                        }
                    })()}
                    {(() => {
                        if (shop.dairyFree) {
                            return (
                                <Entypo
                                    name="leaf"
                                    size={22}
                                    color="green"
                                    title="dairy-free"
                                />
                            );
                        }
                    })()}
                </View>
                <View className="flex flex-row items-center mr-2">
                    <Pressable
                        key={shop._id}
                        onPress={() =>
                            navigation.navigate("ShopPage", {
                                shop_id: shop._id,
                            })
                        }
                    >
                        <View className="m-2 p-2 pr-6 pl-6 bg-blue-900 text-center font-bold text-white rounded-full">
                            <Text className="font-bold text-white ">
                                View Shop
                            </Text>
                        </View>
                    </Pressable>

                    <FavouriteButton
                        city={shop.city}
                        shopId={shop._id}
                        navigation={navigation}
                    />
                </View>
            </View>
        </View>
    );
}
