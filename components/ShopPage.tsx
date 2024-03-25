import { Image, Text, View } from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ShopPage({route}) {

  const { shop_id } = route.params;

  const [shopPage, setShopPage] = useState({});

  useEffect(() => {
    axios
      .get(
        `https://coffee-connoisseur-api.onrender.com/api/shops/Newcastle/${shop_id}`
      )
      .then(({ data: { shop } }) => {
        setShopPage(shop);
      });
  });

  return (
    <View>
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
