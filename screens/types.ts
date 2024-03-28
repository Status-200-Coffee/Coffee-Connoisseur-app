import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
    LoadingScreen: undefined;
    ShopSearch: undefined;
    CitySearch: undefined;
    FullscreenMap: undefined;
    ShopPage: { shop_id: number };
    CoffeeCamera: { shop_id: number };
    LoginPage: undefined;
    SignUpPage: undefined;
    ProfilePage: { username: string };
};

export type Props<K extends keyof RootStackParamList> = NativeStackScreenProps<
    RootStackParamList,
    K
>;
