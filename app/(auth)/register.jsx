import { View, Text, Animated } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { TextInput, Button } from 'react-native-paper';
import { Link } from "expo-router";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Register = () => {
    const [text, setText] = useState("");
    const animation = useRef(new Animated.Value(1)).current; 

 
  
  return (
    <View>
        <View className='top' >
      <Text className="title">Register</Text>
      <Text className="subtitle">Please enter your email to continue your registration</Text>
      </View>
      <View className='under-top'>
      <View className="flex gap-3">
          <Text className="font-manmed text-base text-[#111826] mb-1">
            Email
          </Text>
          <TextInput
            placeholder="Email"
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
            onChangeText={(text) => setText1(text)}
          />
        </View>
      </View>
      <View className="bottom">
      <Animated.View
        style={{
          transform: [{ scale: animation }],
        }}
        className="buttons"
      >
        <Button
          mode="contained"
          textColor={text ? "white" : "#CBCDD0"}
          className={`${
            text ? "bg-[#254EDB]" : "bg-[#EDEEF1]"
          } rounded-lg h-12 flex items-center justify-center`}
        >
          <Text
            className={`text-base font-manbold ${
              text ? "text-white" : "text-[#CBCDD0]"
            }`}
          >
            Sign In
          </Text>
        </Button>
      </Animated.View>
      <View className="p-10 items-center justify-center">
        <Text className="font-manmed text-xs text-[#5C606A] text-center">
          By signing up or logging in, I accept the app’s
          <Text className="text-[#254EDB]"> Terms of Service </Text> and
          <Text className="text-[#254EDB]"> Privacy Policy</Text>
        </Text>
      </View>
      </View>
    </View>
  )
}

export default Register