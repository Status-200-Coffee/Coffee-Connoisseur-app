import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import axios from "axios";
import { Props } from "./types";
import * as Animatable from "react-native-animatable";
import { AntDesign } from "@expo/vector-icons";
import { useCache } from "../contexts/Cache";

const LoginPage = ({ navigation }: Props<"LoginPage">) => {
  const { cache, setCache } = useCache();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginErr, setLoginErr] = useState<boolean>(false);

  const [loginSuccesful, setLoginSuccessful] = useState<boolean>(false);

  function handleLogin() {
    return axios
      .get(`https://coffee-connoisseur-api.onrender.com/api/users/${username}`)
      .then(({ data: { user } }) => {
        if (user.password === password && user.username === username) {
          setLoginErr(false);
          setCache((cache) => {
            return { ...cache, user };
          });
          setUsername("");
          setPassword("");
          setLoginSuccessful(true);
          setTimeout(() => {
            navigation.navigate("ShopSearch");
            setLoginSuccessful(false);
          }, 3000);
        } else {
          setLoginErr(true);
        }
      })
      .catch((err) => {
        setLoginErr(true);
      });
  }
  if (loginSuccesful) {
    return (
      <View className="flex-1 items-center justify-center">
        <Animatable.View
          animation="fadeInDown"
          duration={1000}
          className="bg-black p-4 rounded-3xl mb-10"
        >
          <Text className="text-white text-lg pb-2">Logged in</Text>
          <AntDesign
            name="checkcircle"
            size={30}
            color="white"
            style={{ paddingLeft: 25 }}
          />
        </Animatable.View>
      </View>
    );
  }

  return (
    <View className="bg-white mx-6 rounded-3xl mt-16">
      {cache.user && <Text>hello</Text>}
      {loginErr && (
        <Text className="text-center mt-10  mx-10 bg-red-300 rounded">
          Looks like either your email address or password were incorrect. Wanna
          try again?
        </Text>
      )}
      <Text className="mx-14 mt-10 text-slate-500">Username:</Text>
      <TextInput
        className="border my-2 mx-14 rounded p-1"
        value={username}
        onChangeText={(text) => setUsername(text.trim())}
      ></TextInput>
      <Text className="mx-14 mt-2 text-slate-500">Password:</Text>
      <TextInput
        className="border border my-2 mx-14 rounded p-1"
        value={password}
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text.trim())}
      ></TextInput>
      <Pressable
        onPress={handleLogin}
        className="border my-10 mx-32 items-center pb-1 pt-1 bg-black rounded-full"
      >
        <Text className="text-white">Login</Text>
      </Pressable>
      <Text className="text-center">Not a coffee connoisseur just yet?</Text>
      <Pressable
        onPress={(nav) => navigation.navigate("SignUpPage")}
        className="mb-10"
      >
        <Text className="text-center hover:text-white font-bold 	">
          Join here
        </Text>
      </Pressable>
    </View>
  );
};

export default LoginPage;
