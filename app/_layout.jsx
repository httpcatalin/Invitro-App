import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SplashScreen, Stack } from 'expo-router';
import { useFonts } from 'expo-font';


SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    'man-med': require('../assets/fonts/Manrope-Medium.ttf'),
    'man-bold': require('../assets/fonts/Manrope-Bold.ttf'),
  });


  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded ) return null; 

  return (
    <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="splash" options={{ headerShown: false }} />
        <Stack.Screen name="onboard" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/sign-up" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;
