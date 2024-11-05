import { View, Text, Animated, TouchableOpacity, Image } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "expo-router";
import { OtpInput } from "react-native-otp-entry";

const Otp = () => {
    const [text2, setText] = useState("");
    const [timer, setTimer] = useState(59);
    const [isResendEnabled, setIsResendEnabled] = useState(false);
    const animation = useRef(new Animated.Value(1)).current; 
    const router = useRouter();

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimer(prevTimer => {
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

    return (
        <View className='flex-1 p-6 h-screen bg-white'>
            <View className="middle flex-1 ">
                <View className='top flex flex-col gap-3'>
                    <Text className="title text-3xl font-manbold">Send OTP Code</Text>
                    <Text className="subtitle text-base text-[#5C606A]">Enter the 6-digit code that we have sent via the
                    phone number to <Text className="font-manbold text-black">[email]</Text>
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
                        onFilled={(text) => console.log(`OTP is ${text}`)} 
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
                                width: "auto"
                            },
                            focusStickStyle:{
                                transform: [{ rotate: '90deg' }],
                                marginTop: 25,
                                width: 1,
                                height: 25,
                                color: "#254EDB",
                            },
                            filledPinCodeContainerStyle:{
                                backgroundColor:"#ffffff",
                            },
                            pinCodeTextStyle:{
                                fontSize: 20,
                                fontFamily: "man-med"
                            }
                        }}
                    />
                    <View className="timer flex items-center flex-row gap-2 mt-3">
                        <Image source={require('../../assets/images/timer.png')} className="w-5 h-5" />
                        <Text className="text-[#363C48] font-manbold">{`00:${timer < 10 ? `0${timer}` : timer}`}</Text>
                    </View>
                </View>
            </View>

            <View className="bottom">
                <TouchableOpacity
                    onPress={() => {
                        if (isResendEnabled) {
                            setTimer(59); 
                            setIsResendEnabled(false);
                        }
                    }}
                    
                    className={`bg-white flex items-center mb-4 justify-center h-12 ${isResendEnabled ? '' : 'opacity-50'}`}>
                    <Text className="text-[#254EDB] font-manbold">
                        Resend Code 
                    </Text>
                </TouchableOpacity>
                <Animated.View
                    style={{
                        transform: [{ scale: animation }],
                    }}
                    className="buttons"
                >
                    <TouchableOpacity
                        onPress={() => text2.length==6 ? router.replace('/otp') : null}
                        className={`${
                            text2.length==6 ? "bg-[#254EDB]" : "bg-[#EDEEF1]"
                        } rounded-lg h-12 inline-flex items-center justify-center`}
                    >
                        <Text className={`text-base font-manbold ${text2.length==6 ? "text-white" : "text-[#CBCDD0]"}`}>
                            Continue
                        </Text>
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
    )
}

export default Otp;
