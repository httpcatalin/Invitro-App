import {
  Text,
  View,
  Button,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import axios from "axios";

export default function SignUp({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
  };

  const handleSignUp = async () => {
    setErrors({});
    let formErrors = {};

    if (name.trim().length < 2) {
      formErrors.name = "Full name must be at least 2 characters.";
    }

    if (!validateEmail(email)) {
      formErrors.email = "Please enter a valid email address.";
    }

    if (password.length < 6) {
      formErrors.password = "Password must be at least 6 characters.";
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const userData = {
      name: name,
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        "http://172.31.84.119:5001/register",
        userData
      );
      if (response.data.status === "ok") {
        navigation.navigate("Login");
      } else {
        setErrors({ server: response.data.data });
      }
    } catch (error) {
      setErrors({ server: "Something went wrong. Please try again." });
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
          <Text className="font-bold text-xl">Sign Up</Text>
        </View>

        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          className="w-full h-12 border border-gray-300 rounded-md px-3 mb-1"
        />
        {errors.name && (
          <Text className="text-red-500 mb-2">{errors.name}</Text>
        )}

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          className="w-full h-12 border border-gray-300 rounded-md px-3 mb-1"
        />
        {errors.email && (
          <Text className="text-red-500 mb-2">{errors.email}</Text>
        )}

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          className="w-full h-12 border border-gray-300 rounded-md px-3 mb-1"
        />
        {errors.password && (
          <Text className="text-red-500 mb-2">{errors.password}</Text>
        )}

        {errors.server && (
          <Text className="text-red-500 mb-2">{errors.server}</Text>
        )}

        <Button title="Sign Up" onPress={handleSignUp} color="#3B82F6" />

        <View className="flex flex-row mt-5">
          <Text>Have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text className="text-blue-500 font-bold">Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
