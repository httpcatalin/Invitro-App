import React from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";

export default function HomePage({ navigation }) {
  const [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  const doctors = [
    {
      doctorName: "Dr. Rishi",
      doctorSpeciality: "Cardiologist",
      imageSrc: require("../assets/doc.png"),
    },
    {
      doctorName: "Dr. Amanda",
      doctorSpeciality: "Gynecologist",
      imageSrc: require("../assets/doc.png"),
    },
  ];

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Image source={require("../assets/Vector.png")} style={styles.icon} />
        </TouchableOpacity>
        <Text style={[styles.title, { fontFamily: "Poppins_600SemiBold" }]}>
          Doctors
        </Text>
        <View style={styles.placeholder}></View>
      </View>

      <View style={styles.doctorsContainer}>
        {doctors.map((doctor, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              navigation.navigate("DoctorDetails", {
                doctorName: doctor.doctorName,
                doctorSpeciality: doctor.doctorSpeciality,
              })
            }
          >
            <View style={styles.doctorCard}>
              <Image source={doctor.imageSrc} style={styles.doctorImage} />
              <View style={styles.doctorInfo}>
                <Text style={styles.doctorName}>{doctor.doctorName}</Text>
                <Text style={styles.doctorSpeciality}>
                  {doctor.doctorSpeciality}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem}>
          <Image source={require("../assets/Home.png")} />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Image source={require("../assets/Profile.png")} />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 12,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  placeholder: {
    width: 24,
  },
  doctorsContainer: {
    marginTop: 20,
    flex: 1,
  },
  doctorCard: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  doctorInfo: {
    flex: 1,
    justifyContent: "center",
  },
  doctorName: {
    fontSize: 18,
  },
  doctorSpeciality: {
    fontSize: 14,
    color: "#888",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 20,
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    marginTop: 4,
    fontSize: 12,
    color: "#000",
    fontFamily: "Poppins_400Regular",
    color: "#407CE2",
  },
});
