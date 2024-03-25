import { Image, Text, View } from "react-native";

export default function ShopPage() {

    const shop = {
        id: 1234,
        name: "Coffee Shop",
        mainImage: "https://images.unsplash.com/photo-1453614512568-c4024d13c247",
        userImages: [
          "https://www.foodandwine.com/thmb/KzfhJG9naqoKK6ubunTvOp1GhiU=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Partners-Cortado-FT-BLOG0523-7e4f50be961e4a6490fdfa5a34d6e0f5.jpg",
          "https://abdragons.com/product_images/uploaded_images/depositphotos-43334505-m-2015.jpg",
          "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_center,w_730,h_913/k%2FPhoto%2FRecipes%2F2020-07-How-to-make-affogato-at-home%2FKitchn_HowTo_Affogato_0281",
        ],
        description: "best coffee shop in town",
        longitude: 0,
        latitude: 0,
        city: "city1",
        totalRatings: 10,
        rating: 4.5,
        dogFriendly: true,
        dairyFree: false,
        hasSeating: true,
      };

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
