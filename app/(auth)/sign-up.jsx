import { View, Text, Image } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Link } from "expo-router";

const SignUp = () => {
  return (
    <View className="flex h-screen bg-white">
      <Image
        source={require("../../assets/images/unelta.png")}
        resizeMode="cover"
        className="w-full h-[35%]"
      />
      <View className="flex flex-1 p-6 flex-col space-y-3">
        <Text className="title font-manbold text-2xl">Welcome On Board!</Text>
        <Text className="title font-manmed text-base text-[#5C606A]">
          Begin your journey to better health!
        </Text>

        <View className="flex flex-col gap-4 mt-14 space-y-4">
          <Button
            mode="contained"
            textColor="white"
            className="bg-[#254EDB] rounded-lg h-12 flex items-center justify-center text-xl font-manbold"
          >
            <Link href="/register" className="text-base font-manbold">
              Continue with email
            </Link>
          </Button>

          <Button
            mode="outlined"
            textColor="#1C3BA4"
            theme={{ colors: { outline: "#C0C4CB" } }}
            className="bg-white rounded-lg h-12 flex flex-row items-center justify-center"
          >
            <View className="flex flex-row items-center justify-center">
              <Image
                source={require("../../assets/images/google.png")}
                resizeMode="contain"
                className="w-4 mr-2 flex items-center justify-center"
              />
              <Text className="text-base font-manbold mr-1 text-center text-[#2349CC]">
                Sign In with Google
              </Text>
            </View>
          </Button>
        </View>

        <View className="flex items-center justify-center mt-12 ">
          <Text className="log text-base text-[#5C606A] font-manmed">
            Already have an account?{" "}
            <Link className="text-[#254EDB]" href="/sign-in">
              Sign In
            </Link>
          </Text>
        </View>
      </View>

      <View className="p-10 items-center justify-center">
        <Text className="font-manmed text-xs text-[#5C606A] text-center">
          By signing up or logging in, I accept the app’s
          <Text className="text-[#254EDB]"> Terms of Service </Text> and
          <Text className="text-[#254EDB]"> Privacy Policy</Text>
        </Text>
      </View>
    </View>
  );
};

export default SignUp;
