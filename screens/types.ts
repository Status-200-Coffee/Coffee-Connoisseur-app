import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
    LoadingScreen: undefined;
    ShopSearch: undefined;
    CitySearch: undefined;
    FullscreenMap: undefined;
};

export type Props<K extends keyof RootStackParamList> = NativeStackScreenProps<
    RootStackParamList,
    K
>;
