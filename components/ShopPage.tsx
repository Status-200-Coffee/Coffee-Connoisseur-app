import { Image, Text, View } from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";

interface shop {
  _id: number;
  name: string;
  mainImage: string;
  userImages: Array<string>;
  description: string;
  longitude: number;
  latitude: number;
  city: string;
  distance: string,
  totalRatings: number;
  rating: number;
  dogFriendly: boolean;
  hasSeating: boolean;
  dairyFree: boolean;
}

export default function ShopPage({ route }: { route: any }) {
  const { shop_id } = route.params;
  const [isLoading, setIsLoading] = useState(true)

  const [shopPage, setShopPage] = useState<shop>({
    _id: 0,
    name: "",
    mainImage: "",
    userImages: [],
    description: "",
    longitude: 0,
    latitude: 0,
    city: "",
    distance: "",
    totalRatings: 0,
    rating: 0,
    dogFriendly: false,
    hasSeating: false,
    dairyFree: false,
  });

  useEffect(() => {
    axios
      .get(
        `https://coffee-connoisseur-api.onrender.com/api/shops/Newcastle/${shop_id}`
      )
      .then(({ data: { shop } }) => {
        setShopPage(shop);
        setIsLoading(false)
      });
  }, []);

  return isLoading ? <Text className="">Loading...</Text> : (
    <View className="flex-1 items-center bg-cyan-50">
      <Image 
        className="width-300 height-300 margin-10"
        source={{ uri: shopPage.mainImage }}
        style={{ width: 300, height: 300, margin: 10 }}
      />
      <Text className="font-bold leading-8 text-2xl">{shopPage.name}</Text>
      <Text className="leading-10 text-lg italic">{shopPage.description}</Text>
      <Text className="text-lg">
          Location: {shopPage.distance} | {shopPage.city}
        </Text>
        <Text className="font-bold leading-10 text-lg">{shopPage.rating} / 5</Text>
      <View className="flex-row justify-evenly">
        {(() => {
          if (shopPage.hasSeating) {
            return <Text className="text-xl m-2">🪑</Text>;
          }
        })()}
        {(() => {
          if (shopPage.dogFriendly) {
            return <Text className="text-xl m-2">🐶</Text>;
          }
        })()}
        {(() => {
          if (shopPage.dairyFree) {
            return <Text>🌿</Text>;
          }
        })()}
        </View>
    </View>
  );
}
