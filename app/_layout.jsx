import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "man-med": require("../assets/fonts/Manrope-Medium.ttf"),
    "man-bold": require("../assets/fonts/Manrope-Bold.ttf"),
  });

  const navigation = useNavigation();

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded) return null;

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="splash" options={{ headerShown: false }} />
      <Stack.Screen name="onboard" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/sign-up" options={{ headerShown: false }} />
      <Stack.Screen
        name="(auth)/sign-in"
        options={{
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity className="" onPress={() => navigation.goBack()}>
              <Image
                source={require("../assets/images/Vector.png")}
                className="w-7 h-7"
                resizeMode="stretch"
              />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: "#ffffff",
            borderBottomColor: "#EDEEF1",
            borderBottomWidth: 1,
          },
        }}
      />
    </Stack>
  );
};

export default RootLayout;
