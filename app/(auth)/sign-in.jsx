import { View, Text, Animated, Image, TouchableOpacity, Platform, Alert } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { TextInput } from "react-native-paper";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as WebBrowser from "expo-web-browser";
import { useRouter } from "expo-router";
import { useAuthRequest } from "expo-auth-session/providers/google";
import { GOOGLE_CLIENT_ID_IOS, GOOGLE_CLIENT_ID_ANDROID } from "@env";

WebBrowser.maybeCompleteAuthSession();

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const animation = useRef(new Animated.Value(1)).current;
  const router = useRouter();
  const isFormFilled = email && password;

  const [request, response, promptAsync] = useAuthRequest({
    clientId: Platform.OS === "ios" ? GOOGLE_CLIENT_ID_IOS : GOOGLE_CLIENT_ID_ANDROID,
  });

  useEffect(() => {
    if (response?.type === "success") {
      const LOCALHOST = Platform.OS === "ios" ? "127.0.0.1" : "10.0.2.2";
      const { authentication } = response;

      axios
        .get(
          `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${authentication.accessToken}`
        )
        .then((res) => {
          axios.post(`http://${LOCALHOST}:4000/check-email`,{email:res.data.email})
          .then((r)=>{
            if(r.data.status === "ok"){
              Alert.alert("User have not been found", "You have to register the email address first.");
            } else if(r.data.status === "error") {
              router.replace("/home");
            }
            else {
              console.error("Error logging user");
            }
          })
        })
        .catch((error) => {
          console.error("Error fetching user data:", error.message);
        });
    } else if (response?.type === "error") {
      console.error("OAuth error:", response.error);
    }
  }, [response]);

  useEffect(() => {
    Animated.spring(animation, {
      toValue: isFormFilled ? 1.05 : 1,
      friction: 1,
      useNativeDriver: true,
    }).start();
  }, [isFormFilled]);

  const handleLogin = async () => {
    const personData = { email, password };
    const LOCALHOST = Platform.OS === "ios" ? "127.0.0.1" : "10.0.2.2";

    try {
      const loginResponse = await axios.post(`http://${LOCALHOST}:4000/loginUser`, personData);
        
      if (loginResponse.data.status === "ok") {
        router.replace('/home');
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
          Please enter your information to login
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
        onPress={() => promptAsync()}
        className="bg-white border border-[#C0C4CB] rounded-lg h-12 flex flex-row items-center justify-center"
      >
        <View className="flex flex-row items-center justify-center">
          <Image
            source={require("../../assets/images/google.png")}
            resizeMode="contain"
            className="w-4 h-4 mr-2 flex items-center justify-center"
          />
          <Text className="text-base font-manbold text-[#2349CC]">
            Sign In with Google
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;
