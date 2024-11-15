import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Keyboard,
  Animated,
  Alert
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { TextInput } from "react-native-paper";
import { Link, useRouter } from "expo-router";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
import axios from "axios";
const strengthLevels = [
  { label: "Weak", color: "#f04438" },
  { label: "Medium", color: "#ef6820" },
  { label: "Strong", color: "#16b364" },
];

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const barAnimation = useRef(new Animated.Value(0)).current;

  const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  const email = useSelector((state) => state.otp.email);

  const evaluatePasswordStrength = (password) => {
    if (password.length === 0) {
      setPasswordStrength("");
      return;
    }
  
    let strengthIndex = 0;
  
    // Criteria for strength
    if (password.length >= 8) strengthIndex++; // Minimum length criteria
    if (/[A-Z]/.test(password)) strengthIndex++; // Contains uppercase letter
    if (/\d/.test(password)) strengthIndex++; // Contains a number
    if (/[@$!%*?&#]/.test(password)) strengthIndex++; // Contains special character
  
    // Map the strengthIndex to appropriate strength level
    let strengthLevel;
    if (strengthIndex <= 1) {
      strengthLevel = strengthLevels[0]; // Weak
    } else if (strengthIndex === 2 || strengthIndex === 3) {
      strengthLevel = strengthLevels[1]; // Medium
    } else if (strengthIndex >= 4) {
      strengthLevel = strengthLevels[2]; // Strong
    }
  
    setPasswordStrength(strengthLevel);
  
    // Animate the strength bar based on the strength level
    Animated.timing(barAnimation, {
      toValue: strengthIndex - 1, // Since strengthIndex starts from 1
      duration: 500, // Adjust duration as needed
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    evaluatePasswordStrength(password);
  }, [password]);

  const handleRegister = async () => {
    if ( name.trim() === "" ){
      Alert.alert('Name is required', 'Please enter your full name.');
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return; 
    }

    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    const LOCALHOST = Platform.OS === "ios" ? "127.0.0.1" : "10.0.2.2";
  
    const [firstName, lastName = ''] = name.split(' '); // Ensure lastName is defined if absent in the input
  
    const personData = { firstName, lastName };

    try {
      console.log(personData);
      // First API call to create the person
      const response = await axios.post(`http://${LOCALHOST}:4000/registerUserAPI`, personData);
      console.log(response.data);
      if (response.status === 201) { // Check `response.status` instead of `response.data.status`
        
        const personId = response.data.id; // Assign `personId` from response data
  
        const data = {
          firstName,
          lastName,
          email,
          password,
          personId
        };
  
        // Second API call to register the user with `personId`
        const registerResponse = await axios.post(`http://${LOCALHOST}:4000/registerUser`, data);
        
        if (registerResponse.data.status === "ok") {
          router.replace('/sign-in');
        } else {
          alert(registerResponse.data.message);
        }
      } else {
        alert(response.data.message || "Error in creating person");
      }
    } catch (error) {
      alert("Error occurred: " + error.message);
    }
  };


  return (
    <View className=" h-screen bg-white p-6 ">
      <View className="flex  flex-col">
        <View className="top flex  flex-col gap-3">
          <Text className="title text-3xl font-manbold">Register</Text>
          <Text className="subtitle text-base text-[#5C606A]">
            Please enter a form to continue the register
          </Text>
        </View>
        <View className="inputs  mt-4   flex-col">
          <View className="flex gap-2">
            <Text className="font-manmed text-base text-[#111826] mb-1">Full Name</Text>
            <TextInput
              placeholder="Enter your full name"
              value={name}
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
              onChangeText={(text) => setName(text)}
            />
          </View>
          <View className="flex gap-2 mt-4">
            <Text className="font-manmed text-base text-[#111826] mb-1">
              Email
            </Text>
            <TextInput
              placeholder="Enter your Email"
              value={email}
              textColor="#111826"
              mode="outlined"
              className="bg-white"
              theme={{
                colors: {
                  outline: "#C0C4CB",
                  placeholder: "#CBCDD0",
                  primary: "#C0C4CB",
                },
                roundness: 12,
              }}
              editable={false}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View className="flex gap-2 mt-4">
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
                  onPress={() => {
                    Keyboard.dismiss();
                    setShowPassword(!showPassword);
                  }}
                />
              }
              onChangeText={(text) => setPassword(text)}
            />
            {passwordStrength ? (
              <View className="mt-2 flex items-center font-manmed justify-between flex-row">
                <Text style={{ color: passwordStrength.color }}>
                  {passwordStrength.label}
                </Text>
                <View className="flex flex-row  items-center justify-center">
                  {[...Array(3)].map((_, index) => (
                    <Animated.View
                      key={index}
                      style={{
                        width: 50,
                        borderRadius: 15,
                        height: 5,
                        backgroundColor:
                          index <= strengthLevels.indexOf(passwordStrength)
                            ? passwordStrength.color
                            : "#DDE0E5",
                        marginHorizontal: 2,
                        opacity: barAnimation.interpolate({
                          inputRange: [0, 1, 2],
                          outputRange: [0.5, 0.75, 1],
                          extrapolate: "clamp",
                        }),
                      }}
                    />
                  ))}
                </View>
              </View>
            ) : null}
          </View>
          <View className="flex gap-2 mt-4">
            <Text className="font-manmed text-base text-[#111826] mb-1">
              Confirm password
            </Text>
            <TextInput
              placeholder="Enter your password"
              value={confirmPassword}
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
                  onPress={() => {
                    Keyboard.dismiss();
                    setShowPassword(!showPassword);
                  }}
                />
              }
              onChangeText={(text) => setConfirmPassword(text)}
            />
          </View>
        </View>
      </View>
      <View className="bot flex flex-col items-center justify-center mt-24  ">
        <TouchableOpacity
          onPress={handleRegister}
          className={`${password.length >= 8 ? 'bg-[#254EDB]' : 'bg-[#EDEEF1]'} w-full rounded-lg h-12 flex items-center justify-center`}
        >
          <Text
            className={`text-base font-manbold ${
              password.length >= 6 ? "text-white" : "text-[#CBCDD0]"
            }`}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
        <Link
          href="/sign-in"
          className="mt-6 font-manbold text-base text-[#254EDB]"
        >
          I have an account? Sign in
        </Link>
      </View>
    </View>
  );
};

export default RegisterForm;
