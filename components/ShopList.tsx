import { useState } from "react";
import { View, ScrollView } from "react-native";

import ShopCard from "./ShopCard";

import { ShopListProps } from "./types";

export default function ShopList({ shopList, navigation }: ShopListProps) {
    return (
        <ScrollView className="flex flex-col h-full">
            {shopList &&
                shopList.map((shop) => {
                    return (
                        <View key={shop._id}>
                            <ShopCard shop={shop} navigation={navigation} />
                        </View>
                    );
                })}
        </ScrollView>
    );
}
