import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";

export default function DoctorDetails() {
  const route = useRoute();
  const navigation = useNavigation();
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
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate("HomePage")}
          style={styles.backButton}
        >
          <Image source={require("../assets/Vector.png")} className="w-3 h-6" />
        </TouchableOpacity>
        <Text style={[styles.title, { fontFamily: "Poppins_600SemiBold" }]}>
          Appointment's details
        </Text>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/icons8-doctor-50.png")}
          style={styles.doctorImage}
        />
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
    padding: 12,
    paddingHorizontal: 30,
    backgroundColor: "#f7f7f7",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center", // Center the title
    alignItems: "center",
    marginTop: 40,
    width: "100%",
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: 0,
    width: "12px",
    height: "24px",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  doctorImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#407CE2",
  },
  doctorName: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: "center",
  },
  doctorSpeciality: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
  },
});
