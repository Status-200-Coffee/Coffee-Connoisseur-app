import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeStackNavigator from "./StackNavigator";
import ShopSearch from "./screens/ShopSearch";
import LoginPage from "./screens/LoginPage";
import SignUpPage from "./screens/SignUpPage";

const Drawer = createDrawerNavigator();

const AppDrawerNavigator = () => {
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeStackNavigator} />
            <Drawer.Screen name="ShopSearch" component={ShopSearch} />
            <Drawer.Screen name="LoginPage" component={LoginPage} />
            <Drawer.Screen name="SignUpPage" component={SignUpPage} />
        </Drawer.Navigator>
    );
};

export default AppDrawerNavigator;
