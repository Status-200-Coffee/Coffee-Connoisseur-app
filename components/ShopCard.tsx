import { StyleSheet, Image, Text, View } from "react-native";

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
      <Text>{props.shop.name}</Text>
      <Image source={{uri: props.shop.photos}} style={{width: 200, height: 200}} />
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
    </View>
  );
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#ecf0f1',
      padding: 8,
    },
    paragraph: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
  