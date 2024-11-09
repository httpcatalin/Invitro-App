import { View, Text, TouchableOpacity, Platform, Keyboard, Animated } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { TextInput } from 'react-native-paper';
import { Link, useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';

const strengthLevels = [
  { label: 'Weak', color: '#f04438' },
  { label: 'Medium', color: '#ef6820' },
  { label: 'Strong', color: '#16b364' }
];

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const router = useRouter();
  const barAnimation = useRef(new Animated.Value(0)).current;

  const email = useSelector((state) => state.otp.email);

  const evaluatePasswordStrength = (password) => {
    if (password.length === 0) {
      setPasswordStrength('');
      return;
    }

    let strengthIndex = 0;
    if (password.length >= 6) strengthIndex++;
    if (/[A-Z]/.test(password) && /\d/.test(password)) strengthIndex++;
    if (password.length >= 10 && /[@$!%*?&#]/.test(password)) strengthIndex++;

    setPasswordStrength(strengthLevels[strengthIndex]);


    Animated.timing(barAnimation, {
      toValue: strengthIndex,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    evaluatePasswordStrength(password);
  }, [password]);

  return (
    <View className=" h-screen bg-white p-6 ">
      <View className='flex  flex-col' >
        <View className="top flex  flex-col gap-3">
          <Text className="title text-3xl font-manbold">Register</Text>
          <Text className="subtitle text-base text-[#5C606A]">
            Please enter a form to continue the register
          </Text>
        </View>
        <View className="inputs  mt-4   flex-col">
          <View className="flex gap-2">
            <Text className="font-manmed text-base text-[#111826] mb-1">Username</Text>
            <TextInput
              placeholder="Enter your full name"
              value={name}
              mode="outlined"
              textColor="#111826"
              className="bg-white overflow-hidden"
              theme={{
                colors: {
                  outline: '#C0C4CB',
                  placeholder: '#CBCDD0',
                  primary: '#C0C4CB',
                },
                roundness: 12,
              }}
              onChangeText={(text) => setName(text)}
            />
          </View>
          <View className="flex gap-2 mt-4">
            <Text className="font-manmed text-base text-[#111826] mb-1">Email</Text>
            <TextInput
              placeholder="Enter your Email"
              value={email}
              textColor="#111826"
              mode="outlined"
              className="bg-white"
              theme={{
                colors: {
                  outline: '#C0C4CB',
                  placeholder: '#CBCDD0',
                  primary: '#C0C4CB',
                },
                roundness: 12,
              }}
              editable={false}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View className="flex gap-2 mt-4">
            <Text className="font-manmed text-base text-[#111826] mb-1">Password</Text>
            <TextInput
              placeholder="Password"
              value={password}
              textColor="#111826"
              mode="outlined"
              secureTextEntry={!showPassword}
              className="bg-white"
              theme={{
                colors: {
                  outline: '#C0C4CB',
                  placeholder: '#CBCDD0',
                  primary: '#C0C4CB',
                },
                roundness: 12,
              }}
              right={
                <TextInput.Icon
                  icon={() => (
                    <Icon
                      name={showPassword ? 'eye-off' : 'eye'}
                      size={20}
                      color="#CBCDD0"
                    />
                  )}
                  onPress={() => { Keyboard.dismiss(); setShowPassword(!showPassword); }}
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
                            : '#DDE0E5',
                        marginHorizontal: 2,
                        opacity: barAnimation.interpolate({
                          inputRange: [0, 1, 2],
                          outputRange: [0.5, 0.75, 1],
                          extrapolate: 'clamp',
                        }),
                      }}
                    />
                  ))}
                </View>
              </View>
            ) : null}
          </View>
          <View className="flex gap-2 mt-4">
            <Text className="font-manmed text-base text-[#111826] mb-1">Confirm password</Text>
            <TextInput
              placeholder="Enter your password"
              value={confirmPassword}
              textColor="#111826"
              mode="outlined"
              secureTextEntry={!showPassword}
              className="bg-white"
              theme={{
                colors: {
                  outline: '#C0C4CB',
                  placeholder: '#CBCDD0',
                  primary: '#C0C4CB',
                },
                roundness: 12,
              }}
              right={
                <TextInput.Icon
                  icon={() => (
                    <Icon
                      name={showPassword ? 'eye-off' : 'eye'}
                      size={20}
                      color="#CBCDD0"
                    />
                  )}
                  onPress={() => { Keyboard.dismiss(); setShowPassword(!showPassword); }}
                />
              }
              onChangeText={(text) => setConfirmPassword(text)}
            />
          </View>
        </View>
      </View>
      <View className="bot flex flex-col items-center justify-center mt-24  ">
        <TouchableOpacity
          onPress={() => password.length >= 6 ? router.replace('/sign-in') : null}
          className={`${password.length >= 6 ? 'bg-[#254EDB]' : 'bg-[#EDEEF1]'} w-full rounded-lg h-12 flex items-center justify-center`}
        >
          <Text
            className={`text-base font-manbold ${password.length >= 6 ? 'text-white' : 'text-[#CBCDD0]'}`}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
        <Link href='/sign-in' className='mt-6 font-manbold text-base text-[#254EDB]'>
          I have an account? Sign in
        </Link>
      </View>

    </View>
  );
};

export default RegisterForm;
