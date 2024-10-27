import { View, Text } from 'react-native';
import React from 'react';
import { Link } from 'expo-router'; 

const Profile = () => {
  return (
    <View className=""> 
      <Text className="">LdssProfile</Text> 
      <Link href="/splash"> 
        Go to Splash Screen
      </Link>
    </View>
  );
};

export default Profile;
