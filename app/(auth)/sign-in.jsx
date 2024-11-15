import { View, Text, Animated, Image, TouchableOpacity   } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { TextInput, Button } from "react-native-paper";
import { Link, useRouter } from "expo-router";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const animation = useRef(new Animated.Value(1)).current;
  const router = useRouter();
  const isFormFilled = email && password;

  useEffect(() => {
    Animated.spring(animation, {
      toValue: isFormFilled ? 1.05 : 1,
      friction: 1,
      useNativeDriver: true,
    }).start();
  }, [isFormFilled]);

  const handleLogin = async () => {
    const personData = { email, password };

    try {
      const loginResponse = await axios.post('http://10.0.2.2:4000/loginUser', personData);
        
        if (loginResponse.data.status === "ok") {
          router.replace('/');
        } else {
          alert(loginResponse.data.message);
        }
    } catch (error) {
      alert("Error occurred: " + error.message);
    }
  }

  return (
    <View className="h-screen bg-white p-5">
      <View className="top flex flex-col justify-center gap-2">
        <Text className="text-2xl font-manbold">Welcome Back</Text>
        <Text className="text-[#5C606A] text-base">
          Please enter a form to login this app
        </Text>
      </View>
      <View className="inputs my-8 flex flex-col">
        <View className="flex gap-3">
          <Text className="font-manmed text-base text-[#111826] mb-1">
            Email
          </Text>
          <TextInput
            placeholder="email@example.com"
            value={email}
            mode="outlined"
            textColor="#111826"
            className="bg-white overflow-hidden"
            theme={{
              colors: {
                outline: "#C0C4CB",
                placeholder: "#CBCDD0",
                primary: "#C0C4CB",
              },
              roundness: 12,
            }}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View className="flex gap-3 mt-4">
          <Text className="font-manmed text-base text-[#111826] mb-1">
            Password
          </Text>
          <TextInput
            placeholder="Password"
            value={password}
            textColor="#111826"
            mode="outlined"
            secureTextEntry={!showPassword}
            className="bg-white"
            theme={{
              colors: {
                outline: "#C0C4CB",
                placeholder: "#CBCDD0",
                primary: "#C0C4CB",
              },
              roundness: 12,
            }}
            right={
              <TextInput.Icon
                icon={() => (
                  <Icon
                    name={showPassword ? "eye-off" : "eye"}
                    size={20}
                    color="#CBCDD0"
                  />
                )}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
            onChangeText={(text) => setPassword(text)}
          />
          <Link href="/" className="text-[#363C48] text-right mt-1">
            Forgot Password
          </Link>
        </View>
      </View>
      <Animated.View
        style={{
          transform: [{ scale: animation }],
        }}
        className="buttons"
      >
        <TouchableOpacity
          onPress={handleLogin}
          className={`${
            isFormFilled ? "bg-[#254EDB]" : "bg-[#EDEEF1]"
          } rounded-lg h-12 flex items-center justify-center`}
        >
          <Text
            className={`text-base font-manbold ${
              isFormFilled ? "text-white" : "text-[#CBCDD0]"
            }`}
          >
            Sign In
          </Text>
        </TouchableOpacity>
      </Animated.View>
      <View className="w-full bg-[#EDEEF1] h-0.5 my-5 rounded-xl"></View>
      <TouchableOpacity
            className="bg-white border border-[#C0C4CB] rounded-lg h-12 flex flex-row items-center justify-center"
          >
            <View className="flex flex-row items-center justify-center">
              <Image
                source={require("../../assets/images/google.png")}
                resizeMode="contain"
                className="w-4 h-4 mr-2 flex items-center justify-center"
              />
              <Link href='/google' className="text-base font-manbold mr-1 text-center text-[#2349CC]">
                Sign In with Google
              </Link>
            </View>
          </TouchableOpacity>
      <View className="flex items-center justify-center mt-10 text-base">
        <Text className="text-base text-[#5C606A] font-manmed">
          Don’t have an account?{" "}
          <Link className="text-base text-[#254EDB]" href="/register">
            Register
          </Link>
        </Text>
      </View>
    </View>
  );
};

export default SignIn;
