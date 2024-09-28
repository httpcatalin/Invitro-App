import { Text, View, Image, TouchableOpacity } from "react-native";
import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";

export default function Navbar({ navigation }) {
  const [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
  });

  return (
    <View className="h-screen">
      <View className="homeIcon">
        <Text>jkce</Text>
      </View>
    </View>
  );
}
