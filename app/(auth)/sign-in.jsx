import { View, Text, Animated } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { TextInput, Button } from 'react-native-paper';
import { Link } from "expo-router";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const SignIn = () => {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const animation = useRef(new Animated.Value(1)).current; 

  const isFormFilled = text1 && text2;

  useEffect(() => {

    Animated.spring(animation, {
      toValue: isFormFilled ? 1.05 : 1, 
      friction: 1,
      useNativeDriver: true,
    }).start();
  }, [isFormFilled]);

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
            Email or Username
          </Text>
          <TextInput
            placeholder="Email or Username"
            value={text1}
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
            onChangeText={(text) => setText1(text)}
          />
        </View>
        <View className="flex gap-3 mt-4">
          <Text className="font-manmed text-base text-[#111826] mb-1">
            Password
          </Text>
          <TextInput
            placeholder="Password"
            value={text2}
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
            onChangeText={(text) => setText2(text)}
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
        <Button
          mode="contained"
          textColor={isFormFilled ? "white" : "#CBCDD0"}
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
        </Button>
      </Animated.View>
      <View className="w-full bg-[#EDEEF1] h-0.5 my-5 rounded-xl"></View>
      <Button
        mode="outlined"
        textColor="#1C3BA4"
        theme={{ colors: { outline: "#C0C4CB" } }}
        className="bg-white rounded-lg h-12 flex items-center justify-center"
      >
        <Icon name="google" size={17} style={{ marginRight: 8 }} />
        <Text className="text-base font-manbold mr-1">Sign In with Google</Text>
      </Button>
      <View className="flex items-center justify-center mt-10 text-base">
        <Text className="text-base text-[#5C606A] font-manmed">
          Don’t have an account?{" "}
          <Link className="text-base text-[#254EDB]" href="/sign-in">
            Register
          </Link>
        </Text>
      </View>
    </View>
  );
};

export default SignIn;
