import { Text, View, Image, TouchableOpacity } from "react-native";
import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import Navbar from "../components/Navbar/Navbar";

export default function HomePage({ navigation }) {
  const [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
  });

  return (
    <View className="h-screen">
      <Navbar />
    </View>
  );
}
