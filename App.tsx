import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ShopList from "./components/ShopList";
import ShopCard from "./components/ShopCard";
import ShopPage from "./components/ShopPage";

export default function App() {

  const Stack = createNativeStackNavigator();
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ShopList" component={ShopList} />
        <Stack.Screen name="ShopCard" component={ShopCard} />
        <Stack.Screen name="ShopPage" component={ShopPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
