import { Text, View, Image, TouchableOpacity } from "react-native";
import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";

export default function Home({ navigation }) {
  const [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
  });

  return (
    <View className="h-screen bg-white justify-center items-center">
      <View className="w-full h-full justify-center items-center">
        <View className="items-center ">
          <Image source={require("../assets/logo.png")} className="" />
          <Text
            className="text-4xl mb-2 text-[#223A6A] mt-3"
            style={{ fontFamily: "Poppins_500Medium" }}
          >
            I-Health
          </Text>
          <Text className="font-semibold text-2xl  mt-3 text-[#221F1F]">
            Let’s get started!
          </Text>
          <Text
            className=" text-xl font-light mt-2 text-gray-700 "
            style={{ fontFamily: "Poppins_300Light" }}
          >
            Login to Stay healthy and fit
          </Text>
        </View>

        <View className="flex flex-col items-center mt-10 space-y-4">
          <TouchableOpacity
            className="bg-[#407CE2] w-64 h-14 rounded-3xl justify-center items-center"
            onPress={() => navigation.navigate("Login")}
          >
            <Text
              className="text-white  text-lg "
              style={{ fontFamily: "Poppins_400Regular" }}
            >
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-white w-64 h-14 border border-[#407CE2] rounded-3xl justify-center items-center"
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text
              className="text-[#407CE2] text-lg "
              style={{ fontFamily: "Poppins_400Regular" }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
