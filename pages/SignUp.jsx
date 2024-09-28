import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
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

export default function SignUp({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isAgreed, setIsAgreed] = useState(false);
  const [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });
  const handleSignUp = () => {
    setErrors({});

    if (!isAgreed) {
      Alert.alert(
        "Error",
        "You must agree to the Terms of Service and Privacy Policy."
      );
      return;
    }

    if (!name || !email || !password) {
      setErrors({ server: "All fields are required." });
      return;
    }

    axios
      .post("http://172.31.84.119:5001/register", {
        name: name,
        email: email,
        password: password,
      })
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          setErrors({ server: error.response.data.message });
        } else {
          setErrors({ server: "Something went wrong. Please try again." });
        }
      });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        paddingHorizontal: 24,
      }}
    >
      <View style={{ position: "absolute", top: 100, left: 16 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../assets/Vector.png")}
            className="w-2  mr-2"
          />
        </TouchableOpacity>
      </View>

      <View style={{ position: "absolute", top: 100 }}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 24,
            fontFamily: "Poppins_600SemiBold",
          }}
        >
          Sign Up
        </Text>
      </View>

      <View style={{ width: "100%", marginTop: 160, marginBottom: 12 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            paddingHorizontal: 12,
            marginBottom: 30,
            height: 72,
            backgroundColor: "#f2f2f2",
          }}
        >
          <Image
            source={require("../assets/User.png")}
            style={{ width: 24, height: 24, marginRight: 12 }}
          />
          <TextInput
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
            style={{ fontFamily: "Poppins_500Medium" }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            paddingHorizontal: 12,
            marginBottom: 30,
            height: 72,
            backgroundColor: "#f2f2f2",
          }}
        >
          <Image
            source={require("../assets/User-Outline.png")}
            style={{ width: 24, height: 24, marginRight: 12 }}
          />
          <TextInput
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={{ fontFamily: "Poppins_500Medium" }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            paddingHorizontal: 12,
            marginBottom: 12,
            height: 72,
            backgroundColor: "#f2f2f2",
          }}
        >
          <Image
            source={require("../assets/Password.png")}
            style={{ width: 24, height: 24, marginRight: 12 }}
          />
          <TextInput
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={isPasswordHidden}
            style={{ flex: 1, fontFamily: "Poppins_500Medium" }}
          />
          <TouchableOpacity
            onPress={() => setIsPasswordHidden(!isPasswordHidden)}
          >
            <Image
              source={
                isPasswordHidden
                  ? require("../assets/grey.png")
                  : require("../assets/black.png")
              }
              style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>
        </View>

        {errors.server && (
          <Text style={{ color: "red", marginBottom: 12 }}>
            {errors.server}
          </Text>
        )}
      </View>

      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}
      >
        <TouchableOpacity onPress={() => setIsAgreed(!isAgreed)}>
          <Image
            source={
              isAgreed
                ? require("../assets/checkmark_color.png")
                : require("../assets/checkbox.png")
            }
            className="w-5 h-5"
          />
        </TouchableOpacity>
        <Text
          className="text-[11px]"
          style={{ marginLeft: 8, fontFamily: "Poppins_500Medium" }}
        >
          I agree to the healthcare{" "}
          <Text
            className="text-[11px]"
            style={{ color: "#407CE2", marginRight: 10 }}
          >
            Terms of Service
          </Text>
          and
          <Text
            className="text-[11px]"
            style={{ color: "#407CE2", marginLeft: 8 }}
          >
            Privacy Policy
          </Text>
        </Text>
      </View>

      <TouchableOpacity
        onPress={handleSignUp}
        className="bg-[#407CE2] mt-8  w-64 h-14  rounded-full justify-center items-center"
        style={{
          backgroundColor: "#407CE2",
          marginTop: 140,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontFamily: "Poppins_400Regular",
          }}
        >
          Sign Up
        </Text>
      </TouchableOpacity>

      <View
        style={{ flexDirection: "row", marginTop: 20, alignItems: "center" }}
      >
        <Text
          style={{
            letterSpacing: 1,
            fontSize: 14,
            fontFamily: "Poppins_400Regular",
          }}
        >
          Already have an account?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text
            style={{
              color: "#407CE2",
              fontSize: 14,
              marginLeft: 4,
              fontFamily: "Poppins_700Bold",
            }}
          >
            Sign in
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
