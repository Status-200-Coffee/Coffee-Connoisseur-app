import { Image, Text, View, Pressable } from "react-native";

import { ShopCardProps } from "./types";

export default function ShopCard({ shop, navigation }: ShopCardProps) {
    return (
        <View className="flex-row border-2 border-slate-600 rounded m-2 items-center bg-sky-100">
            <Image
                source={{ uri: shop.mainImage }}
                style={{ width: 150, height: 150, margin: 10 }}
            />
            <View className="flex-1 items-center">
                <Text className="font-bold leading-8 text-base">
                    {shop.name}
                </Text>
                <Text>
                    Location: {shop.distance} {shop.city}
                </Text>
                <Text className="font-bold leading-6">{shop.rating} / 5</Text>
                <View className="flex-row justify-evenly">
                    {(() => {
                        if (shop.hasSeating) {
                            return <Text className="text-xl">🪑</Text>;
                        }
                    })()}
                    {(() => {
                        if (shop.dogFriendly) {
                            return <Text className="text-xl">🐶</Text>;
                        }
                    })()}
                    {(() => {
                        if (shop.dairyFree) {
                            return <Text className="text-xl">🌿</Text>;
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
                    <Text className="m-2 p-2 pl-5 pr-5 bg-blue-900 text-center font-bold text-white rounded-full">
                        View Shop
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}
