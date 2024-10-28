import { View, Text } from "react-native";
import React from "react";

const SignIn = () => {
  return (
    <View className="h-screen bg-white p-5">
      <View className="top flex flex-col justify-center gap-2">
        <Text className="text-xl font-manbold">Welcome Back</Text>
        <Text className="subtitle text-[#5C606A]">
          Please enter a form to login this app
        </Text>
      </View>
      <View className="inputs"></View>
    </View>
  );
};

export default SignIn;
