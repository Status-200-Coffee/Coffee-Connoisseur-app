import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { SearchBar } from "@rneui/base";

import { useCache } from "../contexts/Cache";
import { getClosestCity, getCoordsOfPostcode } from "../utils/api";

import { PostcodeSearchProps } from "./types";

export default function PostcodeSearch({ changeCity }: PostcodeSearchProps) {
    const [input, setInput] = useState<string>("");
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>("");

    useEffect(() => {
        if (!submitted) return;
        setErrorMsg("");

        getCoordsOfPostcode(input)
            .then((coords) => {
                if (coords === null) {
                    throw new Error();
                }

                console.log(coords);

                return getClosestCity(coords);
            })
            .then((city) => {
                console.log(city);

                changeCity(city);
            })
            .catch((error) => {
                setErrorMsg("Invalid postcode");
            })
            .finally(() => {
                setSubmitted(false);
            });
    }, [submitted]);

    function handleSearch(text: string) {
        setInput(text);
    }

    function handleSubmit() {
        if (submitted) return;

        setSubmitted(true);
    }

    return (
        <View className="flex-grow">
            <SearchBar
                placeholder="Enter postcode"
                value={input}
                onChangeText={handleSearch}
                autoCorrect={false}
            ></SearchBar>

            <Button title="Submit" onPress={handleSubmit}></Button>

            <Text>{errorMsg}</Text>
        </View>
    );
}
