import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ShopList from "./components/ShopList";
import ShopCard from "./components/ShopCard";
import ShopPage from "./components/ShopPage";
import { useState } from "react";

export default function App() {

  const Stack = createNativeStackNavigator();

  const [shopPage, setShopPage] = useState({})
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ShopList" shopPage={shopPage} setShopPage={setShopPage} component={ShopList} />
        <Stack.Screen name="ShopCard" component={ShopCard} />
        <Stack.Screen name="ShopPage" shopPage={shopPage} setShopPage={setShopPage} component={ShopPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
