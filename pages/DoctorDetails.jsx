import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Picker,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";

export default function DoctorDetails() {
  const route = useRoute();
  const { doctorName, doctorSpeciality } = route.params;

  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState("");
  const [specialities, setSpecialities] = useState([]);
  const [selectedSpeciality, setSelectedSpeciality] =
    useState(doctorSpeciality);
  const [loading, setLoading] = useState(true);

  const [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace this with your actual API call
        const hospitalsData = await fetch("https://api.example.com/hospitals");
        const specialitiesData = await fetch(
          "https://api.example.com/specialities"
        );

        const hospitalsJson = await hospitalsData.json();
        const specialitiesJson = await specialitiesData.json();

        setHospitals(hospitalsJson);
        setSpecialities(specialitiesJson);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (!fontsLoaded || loading) {
    return <ActivityIndicator size="large" color="#407CE2" />;
  }

  return (
    <View style={styles.container}>
      <View style={ }>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Image source={require("../assets/Vector.png")} style={styles.icon} />
        </TouchableOpacity>
        <Text style={[styles.title, { fontFamily: "Poppins_600SemiBold" }]}>
          Doctors
        </Text>
        <View style={styles.placeholder}></View>
      </View>
      <Text style={[styles.doctorName, { fontFamily: "Poppins_600SemiBold" }]}>
        {doctorName}
      </Text>
      <Text
        style={[styles.doctorSpeciality, { fontFamily: "Poppins_400Regular" }]}
      >
        {doctorSpeciality}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  doctorName: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  doctorSpeciality: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
  },
});
