import {
    Button,
    TextInput,
    View,
} from "react-native";

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
        <View className="flex-row">
            <TextInput
                className="border text-xl py-2 px-4 w-64"
                value={searchPhrase}
                onChangeText={setSearchPhrase}
                placeholder="Enter City"
            ></TextInput>

            <Button onPress={onSubmit} title="Search"></Button>
        </View>
    );
}
