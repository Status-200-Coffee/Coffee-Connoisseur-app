import { Text, View, StyleSheet, ScrollView } from "react-native";
import ShopCard from "./ShopCard";
const ShopList = () => {
  // search bar
  // map toggle
  // send a request to the api with the information from search bar or gps location information
  const shops = [
    {
      id: 1234,
      name: "Coffee Shop",
      photos: "https://images.unsplash.com/photo-1453614512568-c4024d13c247",
      description: "Best coffee ever",
      rating: 5,
      location: "54.973190, -1.608716",
      hasSeating: true,
      dogFriendly: true,
      dairyFree: true,
    },
    {
      id: 1320,
      name: "New coffee Shop",
      photos: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56",
      description: "Second best coffee ever",
      rating: 3,
      location: "54.973190, -2.608716",
      hasSeating: false,
      dogFriendly: true,
      dairyFree: true,
    },
  ];
  return (
    <View style={styles.container2}>
      {shops.map((shop) => {
        return (
          <View style={styles.container}>
            <ShopCard shop={shop} key={shop.id} />
          </View>
        );
      })}
    </View>
  );
};

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
  container2: {
    flex: 1,
    flexDirection: "column",
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ShopList;
