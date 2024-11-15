import { View, Text, Animated,Image, Touchable, Alert } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { TextInput, Button } from 'react-native-paper';
import { Link, useRouter} from "expo-router";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native";

const Register = () => {
    const [text, setText] = useState("");
    const animation = useRef(new Animated.Value(1)).current; 
    const router = useRouter();

  const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    const handleRegister = () => {
        if (!emailRegex.test(text)) {
            Alert.alert('Invalid Email', 'Please enter a valid email address.');
            return;
        }

        router.replace('/otp');
    }

    useEffect(() => {
      Animated.spring(animation, {
        toValue: emailRegex.test(text) ? 1.05 : 1,
        friction: 1,
        useNativeDriver: true,
      }).start();
    }, [text]);

    return (
        <View className='flex-1 p-6 h-screen bg-white'>
            <View className='flex-1 justify-between'>
                <View className='top flex flex-col gap-3'>
                    <Text className="title text-3xl font-manbold">Register</Text>
                    <Text className="subtitle text-base text-[#5C606A]">Please enter your email to continue your registration</Text>
                </View>
                <View className=' flex-1 under-top mt-9'>
                    <View className="flex gap-2 flex-col ">
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
                            onChangeText={(text) => setText(text)}
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
                      onPress={handleRegister}
                        className={`${
                            emailRegex.test(text) ? "bg-[#254EDB]" : "bg-[#EDEEF1]"
                        } rounded-lg h-12 inline-flex items-center justify-center`}
                    >
                        <Text
                            className={`text-base font-manbold ${
                                emailRegex.test(text) ? "text-white" : "text-[#CBCDD0]"
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
    )
}

export default Register;
