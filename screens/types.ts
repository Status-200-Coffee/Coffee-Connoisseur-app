import {
    DrawerNavigationProp,
    DrawerScreenProps,
} from "@react-navigation/drawer";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
    WelcomePage: undefined;
    ShopSearch: undefined;
    CitySearch: undefined;
    FullscreenMap: undefined;
    ShopPage: { shop_id: number };
    CoffeeCamera: { shop_id: number, city: string };
    LoginPage: undefined;
    SignUpPage: undefined;
    ProfilePage: { username: string };
};

export type Props<K extends keyof RootStackParamList> = NativeStackScreenProps<
    RootStackParamList,
    K
>;

export type DrawerParamList = {
    WelcomePage: undefined;
    HomeStackNavigator: undefined;
    LoginPageStackNavigator: undefined;
    ProfilePageStackNavigator: undefined;
};

export type WelcomePageProps = {
    navigation: DrawerNavigationProp<DrawerParamList, "WelcomePage">;
};

// No idea why this doesn't work
//
// export type DrawerProps<K extends keyof DrawerParamList> = DrawerScreenProps<
//     DrawerParamList,
//     K
// >;
