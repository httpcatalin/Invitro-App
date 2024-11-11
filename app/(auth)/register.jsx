import { View, Text, Animated, Image, Touchable, Platform } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { TextInput, Button } from "react-native-paper";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setEmail } from "../../store/otpSlice";

const Register = () => {
  const [text, setText] = useState("");
  const animation = useRef(new Animated.Value(1)).current;
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    Animated.spring(animation, {
      toValue: text ? 1.05 : 1,
      friction: 1,
      useNativeDriver: true,
    }).start();
  }, [text]);

  const handleOTP = async () => {
    try {
      console.log("Sending OTP for:", text);
      const LOCALHOST = Platform.OS === "ios" ? "127.0.0.1" : "10.0.2.2";

      const response = await axios.post(`http://${LOCALHOST}:4000/send-otp`, {
        email: text,
      });
      dispatch(setEmail(text));
      router.replace("/otp");
      console.log(response.data);
    } catch (error) {
      console.error(
        "Error sending OTP: ",
        error.response?.data || error.message
      );
    }
  };

  return (
    <View className="flex-1 p-6 h-screen bg-white">
      <View className="flex-1 justify-between">
        <View className="top flex flex-col gap-3">
          <Text className="title text-3xl font-manbold">Register</Text>
          <Text className="subtitle text-base text-[#5C606A]">
            Please enter your email to continue your registration
          </Text>
        </View>
        <View className="flex-1 under-top mt-9">
          <View className="flex gap-2 flex-col">
            <Text className="font-manmed text-base text-black mb-1">Email</Text>
            <TextInput
              left={
                <TextInput.Icon
                  icon={() => (
                    <Image
                      source={require("../../assets/images/mail.png")}
                      style={{ width: 24, height: 24 }}
                    />
                  )}
                />
              }
              placeholder="email.example@gmail.com"
              value={text}
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
              onChangeText={(text) => setText(text.toLowerCase())}
            />
          </View>
        </View>
      </View>
      <View className="bottom">
        <Animated.View
          style={{
            transform: [{ scale: animation }],
          }}
          className="buttons"
        >
          <TouchableOpacity
            onPress={handleOTP}
            className={`${
              text ? "bg-[#254EDB]" : "bg-[#EDEEF1]"
            } rounded-lg h-12 inline-flex items-center justify-center`}
          >
            <Text
              className={`text-base font-manbold ${
                text ? "text-white" : "text-[#CBCDD0]"
              }`}
            >
              Continue
            </Text>
          </TouchableOpacity>
        </Animated.View>
        <View className="px-16 py-5 items-center justify-center">
          <Text className="font-manmed text-xs text-[#5C606A] text-center">
            By signing up or logging in, I accept the app’s
            <Text className="text-[#254EDB]"> Terms of Service </Text> and
            <Text className="text-[#254EDB]"> Privacy Policy</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Register;
