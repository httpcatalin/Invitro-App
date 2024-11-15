import { View, Text, Image, Platform, Alert } from "react-native";
import { useEffect } from "react";
import axios from "axios";
import { Link, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { useAuthRequest } from "expo-auth-session/providers/google";
import { GOOGLE_CLIENT_ID_IOS, GOOGLE_CLIENT_ID_ANDROID } from "@env";

const SignUp = () => {
  const router = useRouter();

  const [request, response, promptAsync] = useAuthRequest({
    clientId: Platform.OS === "ios" ? GOOGLE_CLIENT_ID_IOS : GOOGLE_CLIENT_ID_ANDROID,
  });

  useEffect(() => {
    if (response?.type === "success") {
      const LOCALHOST = Platform.OS === "ios" ? "127.0.0.1" : "10.0.2.2";
      const { authentication } = response;

      axios
        .get(
          `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${authentication.accessToken}`
        )
        .then((res) => {
          axios.post(`http://${LOCALHOST}:4000/check-email`,{email:res.data.email})
          .then((r)=>{
            if(r.data.status == 'ok'){
              const personData = {
                firstName: res.data.given_name,
                lastName: res.data.family_name
              }
              axios
               .post(`http://${LOCALHOST}:4000/registerUserAPI`, personData)
               .then((r) => {
  
                 const userData = {
                   firstName: res.data.given_name,
                   lastName: res.data.family_name,
                   email: res.data.email,
                   personId: r.data.id,
                   googleId: res.data.sub,
                   picture: res.data.picture,
                 };
       
                 axios
                   .post(`http://${LOCALHOST}:4000/registerUserGoogle`, userData)
                   .then((response) => {
                     router.replace("/home");
                   })
                   .catch((error) => {
                     console.error("Error creating user:", error.message);
                   });
               })
               .catch((err) => {
                 console.error("Error getting id-shka:", err.message);
               })
            } else if(r.data.status == 'error') {
              Alert.alert("User already created", "This email has already been registered");
            }
            else {
              console.error("Error creating user");
            }
          })
        })
        .catch((error) => {
          console.error("Error fetching user data:", error.message);
        });
    } else if (response?.type === "error") {
      console.error("OAuth error:", response.error);
    }
  }, [response]);

  return (
    <View className="flex h-screen bg-white">
      <Image
        source={require("../../assets/images/unelta.png")}
        resizeMode="cover"
        className="w-full h-[35%]"
      />
      <View className="flex flex-1 p-6 flex-col space-y-3">
        <Text className="title font-manbold text-2xl">Welcome On Board!</Text>
        <Text className="title font-manmed text-base text-[#5C606A]">
          Begin your journey to better health!
        </Text>

        <View className="flex flex-col gap-4 mt-14 space-y-4">
          <TouchableOpacity
            onPress={() => router.replace("/register")}
            className="bg-[#254EDB]  rounded-lg h-12 flex items-center justify-center text-xl font-manbold"
          >
            <Link
              href="/register"
              className="text-base text-white font-manbold"
            >
              Continue with email
            </Link>
          </TouchableOpacity>

          <TouchableOpacity className="bg-white border border-[#C0C4CB] rounded-lg h-12 flex flex-row items-center justify-center"
          onPress={() => promptAsync()}>
            <View className="flex flex-row items-center justify-center">
              <Image
                source={require("../../assets/images/google.png")}
                resizeMode="contain"
                className="w-4 h-4 mr-2 flex items-center justify-center"
              />
              <Text
                
                className="text-base font-manbold mr-1 text-center text-[#2349CC]"
              >
                Register with Google
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View className="flex items-center justify-center mt-12 ">
          <Text className="log text-base text-[#5C606A] font-manmed">
            Already have an account?{" "}
            <Link className="text-[#254EDB]" href="/sign-in">
              Sign In
            </Link>
          </Text>
        </View>
      </View>

      <View className="px-20 py-5 items-center justify-center">
        <Text className="font-manmed text-xs text-[#5C606A] text-center">
          By signing up or logging in, I accept the app’s
          <Text className="text-[#254EDB]"> Terms of Service </Text> and
          <Text className="text-[#254EDB]"> Privacy Policy</Text>
        </Text>
      </View>
    </View>
  );
};

export default SignUp;
