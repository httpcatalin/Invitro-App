import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { Link, useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={60} // Adjust offset as needed
    >
      <View className="flex-1 h-screen bg-white p-6 justify-between">
        <View>
          <View className="top flex flex-col gap-3">
            <Text className="title text-3xl font-manbold">Register</Text>
            <Text className="subtitle text-base text-[#5C606A]">
              Please enter a form to continue the register
            </Text>
          </View>
          <View className="inputs my-8 flex flex-col">
            <View className="flex gap-3">
              <Text className="font-manmed text-base text-[#111826] mb-1">Email or Username</Text>
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
            <View className="flex gap-3 mt-4">
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
                onChangeText={(text) => setEmail(text)}
              />
            </View>
            <View className="flex gap-3 mt-4">
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
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
                onChangeText={(text) => setPassword(text)}
              />
            </View>
            <View className="flex gap-3 mt-4">
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
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
                onChangeText={(text) => setConfirmPassword(text)}
              />
            </View>
          </View>
        </View>
        <View className="bot flex flex-col items-center justify-center">
          <TouchableOpacity
            onPress={() => password.length === 6 ? router.replace('/registerForm') : null}
            className={`${password.length === 6 ? 'bg-[#254EDB]' : 'bg-[#EDEEF1]'
              }  w-full rounded-lg h-12 inline-flex items-center justify-center`}
          >
            <Text
              className={`text-base font-manbold ${password.length === 6 ? 'text-white' : 'text-[#CBCDD0]'
                }`}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
          <Link href='/sign-in' className='mt-6 font-manbold text-base text-[#254EDB]'>
            I have an account? Sign in
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterForm;
