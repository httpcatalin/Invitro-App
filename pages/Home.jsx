import { StyleSheet, Text, View, Button } from "react-native";

export default function Home({ navigation }) {
  return (
    <View className="h-screen">
      <View className="content flex w-full h-full justify-center items-center">
        <View className="top flex items-center">
          <View className="logo"></View>
          <View className="title">
            <Text>Let’s get started!</Text>
          </View>
          <View className="subtitle">
            <Text>Login to Stay healthy and fit</Text>
          </View>
        </View>
        <View className="buttons">
          <View className="login">
            <Button
              title="Login"
              onPress={() => navigation.navigate("Login")}
            />
            <Button
              title="Sign Up"
              onPress={() => navigation.navigate("SignUp")}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
