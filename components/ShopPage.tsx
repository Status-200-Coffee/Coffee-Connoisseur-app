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
    <View className="flex-1 border-2 m-4">
      <Image
        source={{ uri: shopPage.mainImage }}
        style={{ width: 150, height: 150, margin: 10 }}
      />
      <Text>{shopPage.name}</Text>
      <Text>{shopPage.description}</Text>
      <Text>
        Location: {shopPage.longitude}, {shopPage.latitude} | {shopPage.city}
      </Text>
      <Text>{shopPage.rating}</Text>
      {(() => {
        if (shopPage.hasSeating) {
          return <Text>Has seating</Text>;
        }
      })()}
      {(() => {
        if (shopPage.dogFriendly) {
          return <Text>Dog Friendly</Text>;
        }
      })()}
      {(() => {
        if (shopPage.dairyFree) {
          return <Text>Dairy Free Options</Text>;
        }
      })()}
    </View>
  );
}
