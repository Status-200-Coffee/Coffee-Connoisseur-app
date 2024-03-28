
import React from 'react';
import {Text, View, Image, ScrollView} from 'react-native';
import { useState, useEffect } from 'react';
import axios from "axios";
import { Props } from "./types";

interface user {
    _id: number,
    profilePicture: string,
    username: string,
    password: string,
    email: string,
    coffeeCollected: number,
    photosPosted: Array<string>,
    favouriteShops: Array<number>
}


export default function ProfilePage({ navigation, route }: Props<"ProfilePage">)   {

    const username = "easter"
    // const { username } = route.params;
    // const [isLoading, setIsLoading] = useState(true);
    const [userPage, setUserPage] = useState<user>({
        
            _id: 0,
            profilePicture: "",
            username: "",
            password:"",
            email: "",
            coffeeCollected: 0,
            photosPosted: [],
            favouriteShops: []
        }
    );

    useEffect(() => {
        axios
            .get(
                `https://coffee-connoisseur-api.onrender.com/api/users/${username}`
            )
            .then(({ data: { user } }) => {
                console.log(user)
                setUserPage(user);
                // setIsLoading(false);
            });
    }, []);

   
    // isLoading ? 
    // (
    //     <Text className="">Loading...</Text>
    // ) :
    return  (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text className="font-bold text-lg">Profile</Text>
      <Text >
      Username: {userPage.username}
      </Text>
      <Text className="font-bold text-lg">
      {" "}
        Favourite Coffees</Text>
      <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className=""
                >
                    {userPage.photosPosted.map((image) => {
                        return (
                            <View className="pt-2">
                                <Image
                                    source={{ uri: image }}
                                    style={{
                                        width: 100,
                                        height: 100,
                                        margin: 10,
                                    }}
                                />
                            </View>
                        );
                    })}
                </ScrollView>
    </View>
  );
};

