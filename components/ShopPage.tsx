import { Image, Text, View } from "react-native";
import axios from 'axios'
import { useEffect, useState } from "react";

interface shop_id {shop_id: number}

export default function ShopPage(prop: shop_id) {


  useEffect(()=>{
    axios.get(`https://coffee-connoisseur-api.onrender.com/api/shops/Newcastle/${shop_id}`)
  })

  
  return (
    <View>
      <Image
        source={{ uri: shop.mainImage }}
        style={{ width: 150, height: 150, margin: 10 }}
      />
      <Text>{shop.name}</Text>
      <Text>{shop.description}</Text>
      <Text>
        Location: {shop.longitude}, {shop.latitude} | {shop.city}
      </Text>
      <Text>{shop.rating}</Text>
      {(() => {
        if (shop.hasSeating) {
          return <Text>Has seating</Text>;
        }
      })()}
      {(() => {
        if (shop.dogFriendly) {
          return <Text>Dog Friendly</Text>;
        }
      })()}
      {(() => {
        if (shop.dairyFree) {
          return <Text>Dairy Free Options</Text>;
        }
      })()}
    </View>
  );
}
