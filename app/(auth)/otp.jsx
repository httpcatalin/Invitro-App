import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  Image,
  Keyboard,
  Alert,
  Platform,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "expo-router";
import { OtpInput } from "react-native-otp-entry";
import { useDispatch, useSelector } from "react-redux";
import { ActivityIndicator } from "react-native-paper";
import axios from "axios";

const Otp = () => {
  const [text2, setText] = useState("");
  const [timer, setTimer] = useState(59);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const animation = useRef(new Animated.Value(1)).current;
  const router = useRouter();
  const email = useSelector((state) => state.otp.email);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(intervalId);
          setIsResendEnabled(true);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timer]);

  useEffect(() => {
    Animated.spring(animation, {
      toValue: text2 ? 1.05 : 1,
      friction: 1,
      useNativeDriver: true,
    }).start();
  }, [text2]);

  const handleResend = async () => {
    try {
      console.log("Sending OTP for:", text2);
      const LOCALHOST = Platform.OS === "ios" ? "127.0.0.1" : "10.0.2.2";

      const response = await axios.post(`http://${LOCALHOST}:4000/send-otp`, {
        email: email,
      });
      router.replace("/otp");
      console.log(response.data);
    } catch (error) {
      console.error(
        "Error sending OTP: ",
        error.response?.data || error.message
      );
      Alert.alert("Error", "Failed to send OTP. Please try again.");
    }
  };

  const handleOTP = async (otp) => {
    Keyboard.dismiss();
    setIsVerifying(true);
    const LOCALHOST = Platform.OS === "ios" ? "127.0.0.1" : "10.0.2.2";
    try {
      const response = await axios.post(`http://${LOCALHOST}:4000/verify-otp`, {
        email,
        otpInput: otp,
      });

      if (response.data.status === "success") {
        Alert.alert("Success", response.data.message);
        router.replace("/registerForm");
      } else {
        Alert.alert("Verification Failed", response.data.message);
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again later.");
      console.error("OTP verification error:", error);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <View className="flex-1 p-6 h-screen bg-white">
      <View className="middle flex-1">
        <View className="top flex flex-col gap-3">
          <Text className="title text-3xl font-manbold">Send OTP Code</Text>
          <Text className="subtitle text-base text-[#5C606A]">
            Enter the 6-digit code that we have sent via the email to{" "}
            <Text className="font-manbold text-black">{email}</Text>
          </Text>
        </View>
        <View className="otp-code mt-10">
          <OtpInput
            numberOfDigits={6}
            focusStickBlinkingDuration={500}
            hideStick={0}
            onTextChange={(text) => setText(text)}
            type="numeric"
            focusColor="#254EDB"
            onFilled={(otp) => {
              handleOTP(otp);
            }}
            theme={{
              pinCodeContainerStyle: {
                backgroundColor: "#EDEEF1",
                borderRadius: 15,
                padding: 10,
                width: 50,
                height: 50,
                justifyContent: "center",
                alignContent: "center",
              },
              containerStyle: {
                width: "auto",
              },
              focusStickStyle: {
                transform: [{ rotate: "90deg" }],
                marginTop: 25,
                width: 1,
                height: 25,
                color: "#254EDB",
              },
              filledPinCodeContainerStyle: {
                backgroundColor: "#ffffff",
              },
              pinCodeTextStyle: {
                fontSize: 20,
                fontFamily: "man-med",
              },
            }}
          />
          <View className="timer flex items-center flex-row gap-2 mt-3">
            <Image
              source={require("../../assets/images/timer.png")}
              className="w-5 h-5"
            />
            <Text className="text-[#363C48] font-manbold">{`00:${
              timer < 10 ? `0${timer}` : timer
            }`}</Text>
          </View>
        </View>
      </View>

      <View className="bottom">
        <TouchableOpacity
          onPress={() => {
            if (isResendEnabled) {
              setTimer(59);
              setIsResendEnabled(false);
              handleResend();
            }
          }}
          className={`bg-white flex items-center mb-4 justify-center h-12 ${
            isResendEnabled ? "" : "opacity-50"
          }`}
        >
          <Text className="text-[#254EDB] font-manbold">Resend Code</Text>
        </TouchableOpacity>
        <Animated.View
          style={{
            transform: [{ scale: animation }],
          }}
          className="buttons"
        >
          <TouchableOpacity
            onPress={() => handleOTP(text2)}
            className={`${
              text2.length === 6 ? "bg-[#254EDB]" : "bg-[#EDEEF1]"
            } rounded-lg h-12 inline-flex items-center justify-center`}
            disabled={isVerifying || text2.length !== 6}
          >
            {isVerifying ? (
              <View className="flex-row items-center">
                <ActivityIndicator color="white" size="small" />
                <Text className="text-base font-manbold text-white ml-2">
                  Verifying...
                </Text>
              </View>
            ) : (
              <Text
                className={`text-base font-manbold ${
                  text2.length === 6 ? "text-white" : "text-[#CBCDD0]"
                }`}
              >
                Continue
              </Text>
            )}
          </TouchableOpacity>
        </Animated.View>
        <View className="px-10 py-5 items-center justify-center">
          <Text className="font-manmed text-xs text-[#5C606A] text-center">
            By signing up or logging in, I accept the app’s
            <Text className="text-[#254EDB]"> Terms of Service </Text> and
            <Text className="text-[#254EDB]">Privacy Policy</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Otp;
