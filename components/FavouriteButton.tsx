import { Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { useCache } from "../contexts/Cache";
import { addFavouriteShop, removeFavouriteShop } from "../utils/api";

import { FavouriteButtonProps } from "./types";

export default function FavouriteButton({ shopId }: FavouriteButtonProps) {
    const { cache, setCache } = useCache();

    function handleAddFavourite() {
        addFavouriteShop(cache.user!.username, shopId)
            .then((user) => {
                console.log(user.favouriteShops);

                setCache((currentCache) => {
                    return { ...currentCache, user };
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function handleRemoveFavourite() {
        removeFavouriteShop(cache.user!.username, shopId)
            .then((user) => {
                console.log(user.favouriteShops);

                setCache((currentCache) => {
                    return { ...currentCache, user };
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function shopIsFavourited() {
        return cache.user!.favouriteShops.includes(shopId);
    }

    if (cache.user === null) return null;

    if (shopIsFavourited()) {
        return (
            <Pressable onPress={handleRemoveFavourite}>
                <AntDesign name="heart" size={28} color="purple" />
            </Pressable>
        );
    } else {
        return (
            <Pressable onPress={handleAddFavourite}>
                <AntDesign name="heart" size={30} color="#FF3368" />
            </Pressable>
        );
    }
}

// Animation
//
// if (!favouriteSuccesful) {
//     return (
//         <Pressable onPress={handleFavourite}>
//             <AntDesign name="heart" size={28} color="#FF3368" />
//         </Pressable>
//     );
// }
// if (favouriteSuccesful) {
//     return (
//         <Animatable.View animation="shake" duration={3000}>
//             <Pressable onPress={handleRemoveFavourite}>
//                 <AntDesign name="heart" size={28} color="purple" />
//             </Pressable>
//         </Animatable.View>
//     );
// }

// Fail Animation (not logged in)
//
// if (favouriteError) {
//     return (
//         <View className="m-3 flex-1 pb-5justify-center border-slate-700 bg-sky-100 border-2 rounded items-center">
//             <View className="m-3 items-center justify-center">
//                 <Text className="m-2 font-bold text-xl text-center">
//                     Login or create an account to add this shop to your
//                     favourites
//                 </Text>
//                 <Fontisto name="coffeescript" size={24} color="#FF3368" />
//             </View>
//             <Animatable.View animation="zoomIn" duration={4000}>
//                 <Pressable
//                     onPress={() => {
//                         navigation.navigate("LoginPage");
//                     }}
//                 >
//                     <Text className="m-2 p-2 pr-12 pl-12 bg-blue-900 rounded-full text-center font-bold text-white text-base">
//                         Login
//                     </Text>
//                 </Pressable>
//                 <Pressable
//                     onPress={() => {
//                         navigation.navigate("SignUpPage");
//                     }}
//                 >
//                     <Text className="m-2 p-2 pr-12 pl-12 bg-blue-900 rounded-full text-center font-bold text-white text-base">
//                         Sign up
//                     </Text>
//                 </Pressable>
//             </Animatable.View>
//         </View>
//     );
// }
