import { View, Text, Animated, Image, TouchableOpacity } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as WebBrowser from "expo-web-browser";
import { useRouter } from "expo-router";
import { useAuthRequest } from "expo-auth-session/providers/google";
import { GOOGLE_CLIENT_ID_IOS } from "@env";
import axios from "axios";
import { Platform } from "react-native";
WebBrowser.maybeCompleteAuthSession();

const SignIn = () => {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const animation = useRef(new Animated.Value(1)).current;
  const router = useRouter();
  const isFormFilled = text1 && text2;

  const [request, response, promptAsync] = useAuthRequest({
    clientId: GOOGLE_CLIENT_ID_IOS,
  });

  useEffect(() => {
    if (response?.type === "success") {
      const LOCALHOST = Platform.OS === "ios" ? "127.0.0.1" : "10.0.2.2";
      const { authentication } = response;

      console.log("Google Authentication Success:", authentication.accessToken);

      axios
        .get(
          `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${authentication.accessToken}`
        )
        .then((res) => {
          const userData = {
            firstName: res.data.given_name,
            lastName: res.data.family_name,
            email: res.data.email,
            googleId: res.data.sub,
            picture: res.data.picture,
          };

          console.log("User Data:", userData);

          const LOCALHOST = Platform.OS === "ios" ? "127.0.0.1" : "10.0.2.2";
          axios
            .post(`http://${LOCALHOST}:4000/registerUserGoogle`, userData)
            .then((response) => {
              console.log("User created successfully:", response.data);
              router.replace("/home");
            })
            .catch((error) => {
              console.error("Error creating user:", error.message);
            });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error.message);
        });
    } else if (response?.type === "error") {
      console.error("OAuth error:", response.error);
    }
  }, [response]);

  useEffect(() => {
    Animated.spring(animation, {
      toValue: isFormFilled ? 1.05 : 1,
      friction: 1,
      useNativeDriver: true,
    }).start();
  }, [isFormFilled]);

  return (
    <View className="h-screen bg-white p-5">
      <View className="top flex flex-col justify-center gap-2">
        <Text className="text-2xl font-manbold">Welcome Back</Text>
        <Text className="text-[#5C606A] text-base">
          Please enter your information to login
        </Text>
      </View>
      <View className="inputs my-8 flex flex-col">
        <Text className="font-manmed text-base text-[#111826] mb-1">
          Email or Username
        </Text>
        <TextInput
          placeholder="Email or Username"
          value={text1}
          mode="outlined"
          textColor="#111826"
          className="bg-white overflow-hidden"
          theme={{
            colors: {
              outline: "#C0C4CB",
              placeholder: "#CBCDD0",
              primary: "#C0C4CB",
            },
            roundness: 12,
          }}
          onChangeText={(text) => setText1(text)}
        />
        <Text className="font-manmed text-base text-[#111826] mt-4 mb-1">
          Password
        </Text>
        <TextInput
          placeholder="Password"
          value={text2}
          textColor="#111826"
          mode="outlined"
          secureTextEntry={!showPassword}
          className="bg-white"
          theme={{
            colors: {
              outline: "#C0C4CB",
              placeholder: "#CBCDD0",
              primary: "#C0C4CB",
            },
            roundness: 12,
          }}
          right={
            <TextInput.Icon
              icon={() => (
                <Icon
                  name={showPassword ? "eye-off" : "eye"}
                  size={20}
                  color="#CBCDD0"
                />
              )}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
          onChangeText={(text) => setText2(text)}
        />
      </View>
      <Animated.View
        style={{
          transform: [{ scale: animation }],
        }}
        className="buttons"
      >
        <TouchableOpacity
          onPress={() => (isFormFilled ? router.replace("/") : null)}
          className={`${
            isFormFilled ? "bg-[#254EDB]" : "bg-[#EDEEF1]"
          } rounded-lg h-12 flex items-center justify-center`}
        >
          <Text
            className={`text-base font-manbold ${
              isFormFilled ? "text-white" : "text-[#CBCDD0]"
            }`}
          >
            Sign In
          </Text>
        </TouchableOpacity>
      </Animated.View>
      <View className="w-full bg-[#EDEEF1] h-0.5 my-5 rounded-xl"></View>
      <TouchableOpacity
        onPress={() => promptAsync()}
        className="bg-white border border-[#C0C4CB] rounded-lg h-12 flex flex-row items-center justify-center"
      >
        <View className="flex flex-row items-center justify-center">
          <Image
            source={require("../../assets/images/google.png")}
            resizeMode="contain"
            className="w-4 h-4 mr-2 flex items-center justify-center"
          />
          <Text className="text-base font-manbold text-[#2349CC]">
            Sign In with Google
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;
