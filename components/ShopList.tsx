import { View, StyleSheet } from "react-native";
import ShopCard from "./ShopCard";

const ShopList = () => {

  // send a request to the api with the information from search bar or gps location information
  const shops = [
        {
      id: 1234,
      name: "Coffee Shop",
      mainImage: "https://images.unsplash.com/photo-1453614512568-c4024d13c247",
      userImages: ["https://www.foodandwine.com/thmb/KzfhJG9naqoKK6ubunTvOp1GhiU=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Partners-Cortado-FT-BLOG0523-7e4f50be961e4a6490fdfa5a34d6e0f5.jpg","https://abdragons.com/product_images/uploaded_images/depositphotos-43334505-m-2015.jpg","https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_center,w_730,h_913/k%2FPhoto%2FRecipes%2F2020-07-How-to-make-affogato-at-home%2FKitchn_HowTo_Affogato_0281"],
      description: "best coffee shop in town",
      longitude: 0, 
      latitude: 0,
      city: "city1",
      totalRatings: 10,
      rating: 4.5,
      dogFriendly: true,
      dairyFree: false,
      hasSeating: true,
    },
    {
      id: 2,
      name: "New Coffee Shop",
      mainImage: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56",
      userImages: ["https://www.foodandwine.com/thmb/KzfhJG9naqoKK6ubunTvOp1GhiU=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Partners-Cortado-FT-BLOG0523-7e4f50be961e4a6490fdfa5a34d6e0f5.jpg","https://abdragons.com/product_images/uploaded_images/depositphotos-43334505-m-2015.jpg","https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_center,w_730,h_913/k%2FPhoto%2FRecipes%2F2020-07-How-to-make-affogato-at-home%2FKitchn_HowTo_Affogato_0281"],
      description: "Second best coffee ever",
      longitude: 1, 
      latitude: 1,
      city: "city1",
      totalRatings: 8,
      rating: 4.9,
      dogFriendly: true,
      dairyFree: false,
      hasSeating: true,
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
  }
});

export default ShopList;
