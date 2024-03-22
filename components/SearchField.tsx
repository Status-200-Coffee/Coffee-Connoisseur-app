import { Button, Pressable, Text, TextInput, View } from "react-native";

interface SearchFieldProps {
    searchPhrase: string;
    setSearchPhrase: (text: string) => void;
    onSubmit: () => void;
}

export default function SearchField(props: SearchFieldProps) {
    const searchPhrase = props.searchPhrase;
    const setSearchPhrase = props.setSearchPhrase;
    const onSubmit = props.onSubmit;

    return (
        <View className="flex-row justify-center py-4 ">
            <TextInput
                className="border text-xl py-2 px-4 w-64 mr-2"
                value={searchPhrase}
                onChangeText={setSearchPhrase}
                placeholder="Enter City"
            ></TextInput>

            <Pressable className="border w-20" onPress={onSubmit}>
                <Text className="text-xl justify-center">Search</Text>
            </Pressable>
        </View>
    );
}
