import { View, ScrollView, Text } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import ShopCard from "./ShopCard";

interface shop {
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
}

const ShopList = () => {
  const [shopList, setShopList] = useState<shop[]>([]);

  useEffect(() => {
    axios
      .get("https://coffee-connoisseur-api.onrender.com/api/shops/Newcastle")
      .then(({ data: { shops } }) => {
        setShopList(shops);
      });
  }, []);

  return (
    <ScrollView>
      {shopList.map((shop) => {
        return (
          <View>
            <ShopCard shop={shop} key={shop._id} />
          </View>
        );
      })}
    </ScrollView>
  );
};

export default ShopList;
