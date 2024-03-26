import { useNavigation } from "@react-navigation/native";
import { Image, Text, View, Button, Pressable } from "react-native";

type ShopProps = {
  shop: {
    _id: number;
    name: string;
    mainImage: string;
    userImages: Array<string>;
    description: string;
    longitude: number;
    latitude: number;
    city: string;
    distance: string;
    totalRatings: number;
    rating: number;
    dogFriendly: boolean;
    hasSeating: boolean;
    dairyFree: boolean;
  };
};

export default function ShopCard(props: ShopProps) {
  const navigation = useNavigation<any>();

  const shop = props.shop;

  return (
    <View className="flex-row border-2 rounded m-2 items-center bg-sky-100">
      <Image
        source={{ uri: shop.mainImage }}
        style={{ width: 150, height: 150, margin: 10 }}
      />
      <View className="flex-1">
        <Text className="font-bold leading-8 text-base">{shop.name}</Text>
        <Text className="italic">{shop.description}</Text>
        <Text>
          Location: {shop.distance} | {shop.city}
        </Text>
        <Text className="font-bold leading-6">{shop.rating} / 5</Text>
        <View className="flex-row justify-evenly">
        {(() => {
          if (shop.hasSeating) {
            return <Text className="text-xl m-1">🪑</Text>;
          }
        })()}
        {(() => {
          if (shop.dogFriendly) {
            return <Text className="text-xl m-1">🐶</Text>;
          }
        })()}
        {(() => {
          if (shop.dairyFree) {
            return <Text className="text-xl m-1">🌿</Text>;
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
          <Text className="border-2 rounded m-2 p-2 bg-emerald-300 text-center font-bold">View Shop</Text>
        </Pressable>
      </View>
    </View>
  );
}
