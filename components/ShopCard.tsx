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
};

export default function ShopCard(props: ShopProps) {

  const navigation = useNavigation();

  return (
    <View className="border-2 m-2">
      <Image
        source={{ uri: props.shop.mainImage }}
        style={{ width: 150, height: 150, margin: 10 }}
      />
      <Text>{props.shop.name}</Text>
      <Text>{props.shop.description}</Text>
      <Text>
        Location: {props.shop.longitude}, {props.shop.latitude} |{" "}
        {props.shop.city}
      </Text>
      <Text>{props.shop.rating}</Text>
      {(() => {
        if (props.shop.hasSeating) {
          return <Text>Has seating</Text>;
        }
      })()}
      {(() => {
        if (props.shop.dogFriendly) {
          return <Text>Dog Friendly</Text>;
        }
      })()}
      {(() => {
        if (props.shop.dairyFree) {
          return <Text>Dairy Free Options</Text>;
        }
      })()}
      <Button
        title="View Shop"
        key={props.shop._id}
        onPress={() => navigation.navigate("ShopPage")}
      />
    </View>
  );
}

