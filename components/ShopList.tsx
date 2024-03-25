import { View, ScrollView } from "react-native";
import ShopCard from "./ShopCard";
import { useEffect, useState } from "react";
import axios from "axios";

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

const ShopList = () => {
  const [shopList, setShopList] = useState([]);

  useEffect(() => {
    axios
      .get("https://coffee-connoisseur-api.onrender.com/api/shops/Newcastle")
      .then(({ data: { shops } }) => {
        console.log("shops", shops)
        setShopList(shops);
      });
  },[]);

  return (
    <ScrollView className="flex-0.5 justify-content-center">
      {shopList.map((shop) => {
        return (
          <View className="">
            <ShopCard shop={shop} key={shop._id} />
          </View>
        );
      })}
    </ScrollView>
  );
};

export default ShopList;
