import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "expo-router";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

const Splash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("onboard");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View className="flex-1 bg-gray-200 justify-center items-center space-y-40 ">
      <Image
        source={require("../assets/images/logo.png")}
        className="w-[90%] h-1/2"
        resizeMode="contain"
      />
      <ActivityIndicator animating={true} color={MD2Colors.blue800} />
      <Text className="text-center font-manmed">Invitro Diagnostics ©</Text>
    </View>
  );
};

export default Splash;
