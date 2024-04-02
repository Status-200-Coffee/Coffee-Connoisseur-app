import { createDrawerNavigator } from "@react-navigation/drawer";

import {
    LoginPageStackNavigator,
    ProfilePageStackNavigator,
    HomeStackNavigator,
} from "./StackNavigator";
import { useCache } from "./contexts/Cache";

const Drawer = createDrawerNavigator();

const AppDrawerNavigator = () => {
    const { cache } = useCache();

    return (
        <Drawer.Navigator initialRouteName="HomeStackNavigator">
            <Drawer.Screen
                name="HomeStackNavigator"
                component={HomeStackNavigator}
                options={{ title: "Home" }}
            />
            {!cache.user ? (
                <Drawer.Screen
                    name="LoginPageStackNavigator"
                    component={LoginPageStackNavigator}
                    options={{ title: "Log in" }}
                />
            ) : (
                <Drawer.Screen
                    name="ProfilePageStackNavigator"
                    component={ProfilePageStackNavigator}
                    options={{ title: "My profile" }}
                />
            )}
        </Drawer.Navigator>
    );
};

export default AppDrawerNavigator;
