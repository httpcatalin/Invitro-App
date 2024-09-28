import {
  Text,
  View,
  Button,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState } from "react";
import axios from "axios";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleLogin = async () => {
    setErrors({});

    try {
      const response = await axios.post("http://172.31.84.119:5001/login", {
        email: email,
        password: password,
      });
      Alert.alert("Success", response.data.data);
    } catch (error) {
      if (error.response && error.response.data)
        setErrors({ server: error.response.data.data });
      else setErrors({ server: "Something went wrong. Please try again." });
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <View className="flex flex-col items-center w-full px-4">
        <View className="flex flex-row items-center mb-16">
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Image
              source={require("../assets/Chevron Left.png")}
              className="w-4 mr-2"
            />
          </TouchableOpacity>
          <Text className="font-bold text-xl">Login</Text>
        </View>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          className="w-full h-12 border border-gray-300 rounded-md px-3 mb-1"
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          className="w-full h-12 border border-gray-300 rounded-md px-3 mb-1"
        />

        {errors.server && (
          <Text className="text-red-500 mb-2">{errors.server}</Text>
        )}

        <Button title="Login" onPress={handleLogin} color="#3B82F6" />

        <View className="flex flex-row mt-5">
          <Text>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text className="text-blue-500 font-bold">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
