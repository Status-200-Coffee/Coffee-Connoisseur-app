import { Text, View, TextInput, Pressable } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { Props } from "./types";
import * as Animatable from "react-native-animatable";
import { AntDesign } from "@expo/vector-icons";

const SignUpPage = ({ navigation }: Props<"SignUpPage">) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [usersArr, setUsersArr] = useState<any[]>([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [usernameErr, setUsernameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [accountSuccesful, setAccountSuccesful] = useState(false);

  useEffect(() => {
    axios
      .get(`https://coffee-connoisseur-api.onrender.com/api/users`)
      .then(({ data: { users } }) => {
        setUsersArr(users);
      });
  }, []);

  function handleSignUp() {
    setIsDisabled(false);
    const newUserDetails = {
      username: username,
      email: email,
      password: password,
    };

    const existingUserName = usersArr.find(
      (user) => user.username.trim() === username.trim()
    );
    const existingEmail = usersArr.find(
      (user) => user.email.trim() === email.trim()
    );

    console.log(existingUserName);

    if (
      !/^[a-zA-Z]{2,}\d*[a-zA-Z]*$/i.test(username) ||
      !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}\s*$/.test(email) ||
      !/^(?=.*\d)(?=.*[a-zA-Z]).{5,}\s*$/.test(password) ||
      existingUserName !== undefined ||
      existingEmail !== undefined
    ) {
      setIsDisabled(true);
      setIsDisabled(false);
    } else {
      setAccountSuccesful(true);
      setIsDisabled(false);
      setTimeout(() => {
        navigation.navigate("LoginPage");
      }, 3000);

      return axios
        .post(
          `https://coffee-connoisseur-api.onrender.com/api/users`,
          newUserDetails
        )
        .then((response) => {
          console.log("user signed up succesfully");
        });
    }
  }

  if (accountSuccesful) {
    return (
      <View className="flex-1 items-center justify-center">
        <Animatable.View
          animation="fadeInDown"
          duration={1000}
          className="bg-black p-4 rounded-full mb-10"
        >
          <Text className="text-white text-lg">
            Account succesfully created
          </Text>
          <AntDesign
            name="checkcircle"
            size={30}
            color="white"
            style={{ paddingLeft: 90 }}
          />
        </Animatable.View>
      </View>
    );
  }

  return (
    <View className="bg-white mx-6 rounded-3xl mt-16">
      <Text className="mx-14 mt-4 text-slate-500 pt-6">Email:</Text>
      {emailErr && <Text className="text-red-500 mx-14 mt-1">{emailErr}</Text>}
      <TextInput
        className="border my-2 mx-14 rounded p-1"
        value={email}
        onChangeText={(text) => {
          const trimmedText = text.replace(/\s/g, "");
          setEmail(trimmedText);
        }}
        onBlur={() => {
          if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}\s*$/.test(email)) {
            // setIsDisabled(true);
            setEmailErr("Enter a valid email.");
          } else if (usersArr.find((user) => user.email === email)) {
            setEmailErr("Email already exists!");
          } else {
            // setIsDisabled(false);
            setEmailErr("");
          }
        }}
      ></TextInput>
      <Text className="mx-14 mt-2 text-slate-500">Username:</Text>
      {usernameErr && <Text className="text-red-500 mx-14">{usernameErr}</Text>}
      <TextInput
        className="border my-2 mx-14 rounded p-1"
        value={username}
        onChangeText={(text) => {
          const trimmedText = text.replace(/\s/g, "");
          setUsername(trimmedText);
        }}
        onBlur={() => {
          if (!/^[a-zA-Z]{2,}\d*[a-zA-Z]*$/i.test(username)) {
            // setIsDisabled(true);
            setUsernameErr("Username must be at least 2 characters long.");
          } else if (usersArr.find((user) => user.username === username)) {
            setUsernameErr("Username exists");
          } else {
            // setIsDisabled(false);
            setUsernameErr("");
          }
        }}
      ></TextInput>
      <Text className="mx-14 mt-2 text-slate-500">Password:</Text>
      {passwordErr && (
        <Text className="text-red-500 mx-14 mt-1">{passwordErr}</Text>
      )}
      <TextInput
        className="border my-2 mx-14 rounded p-1"
        value={password}
        secureTextEntry={true}
        onChangeText={(text) => {
          const trimmedText = text.replace(/\s/g, "");
          setPassword(trimmedText);
        }}
        onBlur={() => {
          if (!/^(?=.*\d)(?=.*[a-zA-Z]).{5,}\s*$/.test(password)) {
            // setIsDisabled(true);
            setPasswordErr(
              "Password needs to be at least 5 characters long, including both letters and numbers."
            );
          } else {
            // setIsDisabled(false);
            setPasswordErr("");
          }
        }}
      ></TextInput>
      <Pressable
        onPress={handleSignUp}
        disabled={isDisabled}
        className={`border my-10 mx-32 items-center pb-1 pt-1 bg-black rounded-full`}
      >
        <Text className="text-white">Sign Up</Text>
      </Pressable>
      <View></View>
    </View>
  );
};

export default SignUpPage;
