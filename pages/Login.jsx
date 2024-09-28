import { Text, View, Image, TouchableOpacity, TextInput } from "react-native";
import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import { useState } from "react";
import axios from "axios";

import HomePage from "./HomePage";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });
  const handleLogin = async () => {
    setErrors({});
    try {
      const response = await axios.post("http://172.31.84.119:5001/login", {
        email: email,
        password: password,
      });
      navigation.navigate("HomePage");
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        setErrors({ server: error.response.data.data });
      } else {
        setErrors({ server: "Something went wrong. Please try again." });
      }
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-6 space-y-10">
      <View className="flex flex-row justify-between items-center mb-10 w-full">
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Image
            source={require("../assets/Vector.png")}
            className="w-2  mr-2"
          />
        </TouchableOpacity>
        <Text
          className="font-bold text-2xl mr-3"
          style={{ fontFamily: "Poppins_600SemiBold" }}
        >
          Sign In
        </Text>
        <View className="nik">
          <Text></Text>
        </View>
      </View>

      <View className="w-full mb-3 space-y-3">
        <View className="flex flex-row items-center border border-gray-300 rounded-md px-3 mb-3 h-12 bg-gray-100">
          <Image
            source={require("../assets/User-Outline.png")}
            className="w-5 h-5 mr-2"
          />
          <TextInput
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={{ fontFamily: "Poppins_500Medium" }}
          />
        </View>

        <View className="flex flex-row items-center border border-gray-300 rounded-md px-3 mb-2 h-12 bg-gray-100">
          <Image
            source={require("../assets/Password.png")}
            className="w-5 h-5 mr-2"
          />
          <TextInput
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={isPasswordHidden}
            style={{ fontFamily: "Poppins_400Regular", flex: 1 }}
          />
          <TouchableOpacity
            onPress={() => setIsPasswordHidden(!isPasswordHidden)}
          >
            <Image
              source={
                isPasswordHidden
                  ? require("../assets/ochi.jpg")
                  : require("../assets/Eye Slash.png")
              }
              className="w-5 h-5"
            />
          </TouchableOpacity>
        </View>

        {errors.server && (
          <Text className="text-red-500 mb-2">{errors.server}</Text>
        )}
      </View>

      <TouchableOpacity
        onPress={handleLogin}
        className="bg-[#407CE2] mt-8  w-64 h-14  rounded-full justify-center items-center"
      >
        <Text
          className="text-white text-lg "
          style={{ fontFamily: "Poppins_400Regular" }}
        >
          Sign In
        </Text>
      </TouchableOpacity>

      <View className="flex flex-row mt-5 space-x-2 items-center">
        <Text
          style={{ fontFamily: "Poppins_400Regular" }}
          className="tracking-widest text-md"
        >
          Don't have an account?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text
            className="text-[#407CE2] text-md"
            style={{ fontFamily: "Poppins_700Bold" }}
          >
            Sign up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
