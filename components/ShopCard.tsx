import { useNavigation } from "@react-navigation/native";
import { Image, Text, View, Button } from "react-native";

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
    totalRatings: number;
    rating: number;
    dogFriendly: boolean;
    hasSeating: boolean;
    dairyFree: boolean;
  };
}

export default function ShopCard(props: ShopProps) {

  const navigation = useNavigation<any>();

  const shop = props.shop;

  return (
    <View className="border-2 m-2">
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
      <Button
        title="View Shop"
        key={shop._id}
        onPress={() =>
          navigation.navigate("ShopPage", {
            shop_id: shop._id,
          })
        }
      />
    </View>
  );
}
