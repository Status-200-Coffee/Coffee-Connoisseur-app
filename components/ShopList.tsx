import { useState } from "react";
import { View, ScrollView } from "react-native";
import ShopCard from "./ShopCard";
import { useCache } from "../contexts/Cache";
import { CoffeeShop } from "../types";
import { ShopListProps } from "./types";
import Filters from "./Filters";

export default function ShopList({ navigation }: ShopListProps) {
  const { cache } = useCache();
  const [shopList, setShopList] = useState<CoffeeShop[]>(
    cache.cityShops[cache.currentCity!]
  );

  return (
    <ScrollView className="flex flex-col h-full">
     <Filters />
      {shopList.map((shop) => {
        return (
          <View key={shop._id}>
            <ShopCard shop={shop} navigation={navigation} />
          </View>
        );
      })}
    </ScrollView>
  );
}
