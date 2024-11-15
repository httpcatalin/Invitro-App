import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Stack, useRouter } from "expo-router";
import { useFonts } from "expo-font";
import { Asset } from "expo-asset";
import { Provider } from "react-redux";
import store from "../store/store";
import Splash from "./splash";

const preloadAssets = async () => {


  const imageAssets = [
    require('../assets/images/doctor.jpg'),
    require('../assets/images/gloves.jpg'),
    require('../assets/images/calendar.png'),
    require('../assets/images/google.png'),
    require('../assets/images/logo.png'),
    require('../assets/images/ochi.png'),
    require('../assets/images/unelta.png'),
    require('../assets/images/Vector.png'),
  ].map(image => Asset.fromModule(image).downloadAsync());

  await Promise.all(imageAssets);
};

const RootLayout = () => {
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [fontsLoaded, fontsError] = useFonts({
    "man-med": require("../assets/fonts/Manrope-Medium.ttf"),
    "man-bold": require("../assets/fonts/Manrope-Bold.ttf"),
  });

  const router = useRouter();

  useEffect(() => {
    const loadAssets = async () => {
      try {
        await preloadAssets();
        setAssetsLoaded(true);
      } catch (error) {
        console.warn("Asset preloading error:", error);
      }
    };

    loadAssets();
    return;
  }, []);

  useEffect(() => {
    if (fontsError) {
      console.error("Font loading error:", fontsError);
      return;
    }

    if (fontsLoaded && assetsLoaded)
      router.replace('/onboard');

  }, [fontsLoaded, assetsLoaded, fontsError, router]);

  if (!fontsLoaded || !assetsLoaded) {
    return <Splash />;
  }
  return (
    <Provider store={store}>
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
              <TouchableOpacity onPress={() => router.replace('/sign-up')}>
                <Image
                  source={require("../assets/images/Vector.png")}
                  style={{ width: 19, height: 19 }}
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
        <Stack.Screen
          name="(auth)/register"
          options={{
            headerTitle: "",
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.replace('/sign-up')}>
                <Image
                  source={require("../assets/images/Vector.png")}
                  style={{ width: 19, height: 19 }}
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
        <Stack.Screen
          name="(auth)/otp"
          options={{
            headerTitle: "",
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.replace('/register')}>
                <Image
                  source={require("../assets/images/Vector.png")}
                  style={{ width: 19, height: 19 }}
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
        <Stack.Screen
          name="(auth)/registerForm"
          options={{
            headerTitle: "",
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.replace('/register')}>
                <Image
                  source={require("../assets/images/Vector.png")}
                  style={{ width: 19, height: 19 }}
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
        <Stack.Screen
          name="oauthredirect"
          options={{
            headerShown: false,  
          }}
        />

      </Stack>
    </Provider>
  );
};

export default RootLayout;
