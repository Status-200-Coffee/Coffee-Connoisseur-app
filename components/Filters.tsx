import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";

export default function Filters() {
    return (
        <View className="flex-row justify-center justify-evenly">
            <View className="items-center">
                <Text className="font-bold text-xl">Filters</Text>
                <MaterialIcons name="filter-list" size={25} color="black" />
            </View>
            <View className="items-center">
                <Text className="font-bold text-xl">Sort By</Text>
                <Octicons name="sort-desc" size={23} color="black" />
            </View>
        </View>
    );
}
