import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import DoctorDetails from "./pages/DoctorDetails";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  Poppins_300Light,
} from "@expo-google-fonts/poppins";
import HomePage from "./pages/HomePage";

const Stack = createNativeStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
    Poppins_300Light,
  });

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DoctorDetails"
          component={DoctorDetails}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
