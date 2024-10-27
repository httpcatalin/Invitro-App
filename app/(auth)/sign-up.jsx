import { View, Text, Image } from 'react-native';
import React from 'react';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 

const SignUp = () => {
  return (
    <View className="flex h-screen">
      <Image 
        source={require('../../assets/images/unelta.png')} 
        resizeMode="cover" 
        className="w-full h-[35%]" 
      />
      <View className="flex-1 p-6">
        <Text className="title font-manbold text-2xl">Welcome On Board!</Text>
        <Text className="title font-manmed text-lg">Begin your journey to better health!</Text>
        
        <View className="flex flex-col gap-4 mt-14 space-y-5">
          <Button
            mode="contained"
            textColor="white"
            className="bg-[#254EDB] rounded-lg h-12 flex items-center justify-center text-xl font-manbold"
          >
             <Text className="text-base font-manbold">Continue with email</Text>
          </Button>

          <Button
            mode="outlined"
            textColor="#1C3BA4"
            theme={{ colors: { outline: "#C0C4CB" } }}
            className="bg-white rounded-lg h-12 flex items-center justify-center"
          >
            <Icon 
              name="google" 
              size={17}
              style={{ marginRight: 8 }} 
            />
            <Text className="text-base font-manbold">Sign In with Google</Text>
          </Button>
        </View>

        <View className="flex items-center justify-center mt-8">
          <Text className="log text-lg text-[#5C606A] font-manmed">Already have an account? <Text className="text-[#254EDB]">Sign In</Text></Text>
        </View>
      </View>
      

      <View className="p-6 items-center justify-center">
        <Text className="font-manmed text-sm text-[#5C606A] text-center">
          By signing up or logging in, I accept the app’s 
          <Text className="text-[#254EDB]"> Terms of Service </Text> and 
          <Text className="text-[#254EDB]"> Privacy Policy</Text>
        </Text>
      </View>
    </View>
  );
};

export default SignUp;