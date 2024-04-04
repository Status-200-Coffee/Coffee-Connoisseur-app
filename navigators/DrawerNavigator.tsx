import { createDrawerNavigator } from "@react-navigation/drawer";

import {
    LoginPageStackNavigator,
    ProfilePageStackNavigator,
    HomeStackNavigator,
} from "./StackNavigator";
import WelcomePage from "../screens/WelcomePage";
import { useCache } from "../contexts/Cache";
import {
    HomeRedirect,
    LoginPageRedirect,
    ProfilePageRedirect,
} from "./redirects";

const Drawer = createDrawerNavigator();

const AppDrawerNavigator = () => {
    const { cache } = useCache();

    return (
        <Drawer.Navigator initialRouteName="WelcomePage">
            <Drawer.Screen
                name="WelcomePage"
                component={WelcomePage}
                options={{ headerShown: false, drawerItemStyle: { height: 0 } }}
            />
            <Drawer.Screen
                name="HomeRedirect"
                component={HomeRedirect}
                options={{ title: "Home" }}
            />
            <Drawer.Screen
                name="HomeStackNavigator"
                component={HomeStackNavigator}
                options={{ title: "Home", drawerItemStyle: { height: 0 } }}
            />
            {!cache.user ? (
                <>
                    <Drawer.Screen
                        name="LoginPageRedirect"
                        component={LoginPageRedirect}
                        options={{ title: "Log in" }}
                    />
                    <Drawer.Screen
                        name="LoginPageStackNavigator"
                        component={LoginPageStackNavigator}
                        options={{
                            title: "Log in",
                            drawerItemStyle: { height: 0 },
                        }}
                    />
                </>
            ) : (
                <>
                    <Drawer.Screen
                        name="ProfilePageRedirect"
                        component={ProfilePageRedirect}
                        options={{ title: "My Profile" }}
                    />
                    <Drawer.Screen
                        name="ProfilePageStackNavigator"
                        component={ProfilePageStackNavigator}
                        options={{
                            title: "My profile",
                            drawerItemStyle: { height: 0 },
                        }}
                    />
                </>
            )}
        </Drawer.Navigator>
    );
};

export default AppDrawerNavigator;
