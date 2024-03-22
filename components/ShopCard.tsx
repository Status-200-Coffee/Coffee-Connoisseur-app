import { StyleSheet, Image, Text, View, Button } from "react-native";

type ShopProps = {
  shop: {
    id: number;
    name: string;
    photos: string;
    description: string;
    rating: number;
    location: string;
    hasSeating: boolean;
    dogFriendly: boolean;
    dairyFree: boolean;
  };
};

export default function ShopCard(props: ShopProps) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: props.shop.photos }}
        style={{ width: 200, height: 200 }}
      />
      <Text>{props.shop.name}</Text>
      <Text>{props.shop.description}</Text>
      <Text>Location {props.shop.location}</Text>
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
      <Button title="View Shop" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    justifyContent: "center",
    flexWrap: "wrap",
    backgroundColor: "#ECF0F1",
    padding: 4,
    borderWidth: 1,
    borderColor: "#FF0000",
    margin: 5,
  },
});
