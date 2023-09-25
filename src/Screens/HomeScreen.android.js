import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { background, main, primary, text } from "../components/Colors";
import { useFonts } from "expo-font";
import { Entypo } from "@expo/vector-icons";
import { scale, verticalScale } from "react-native-size-matters";
Text.defaultProps = {
  ...(Text.defaultProps || {}),
  allowFontScaling: false,
};
import { useEffect, useState } from "react";
import { Link } from "expo-router";

const HomeScreen = () => {
  const [loaded] = useFonts({
    Popins: require("../../public/assets/fonts/Poppins-Light.ttf"),
  });
  if (!loaded) {
    return null;
  }
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: background,
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "space-evenly",
          alignItems: "center",
          backgroundColor: background,
          paddingVertical: verticalScale(20),
        }}
      >
        <View style={{alignItems:'center'}}>
          <Entypo name="network" size={scale(90)} color={main} />

          <Text style={styles.heading}>SmartStudy</Text>
          <Text style={[styles.name]}>Your Path to Smart Learning</Text>
        </View>
        {/* <View
          style={{ alignItems: "center", flex: 1, justifyContent: "center" }}
        >
          <Text style={styles.name}>Vasu Bhanderi</Text>
          <Text style={styles.head1}>(Developer)</Text>
          <Text style={styles.name}>Vishnu Bhanderi</Text>
          <Text style={styles.head1}>(Developer)</Text>
          <Text style={styles.name}>Dr. Nileshchandra Pikle</Text>
          <Text style={styles.head1}>(Mentor)</Text>
        </View> */}
        <View style={{ alignItems: "center", marginBottom: verticalScale(20) }}>
          <Image
            source={require("../../public/assets/IIITN.png")}
            style={{ height: verticalScale(75), width: scale(75) }}
          />
          <Text style={styles.head2}>
            Indian Institute of Information Technology
          </Text>
          <Text style={styles.head2}>Nagpur</Text>
        </View>
        <View style={{alignItems:'center'}}>
        <Text style={styles.rights}>Copyright © 2025 SmartStudy</Text>
        <Text style={styles.rights1}>All rights reserved</Text>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  heading: {
    fontFamily: "Popins",
    fontSize: scale(35),
    fontWeight: "400",
    marginTop: verticalScale(5),
    marginBottom: verticalScale(0),
    color: primary,
  },
  head1: {
    fontFamily: "Popins",
    fontSize: scale(14),
    color: primary,
  },
  head2: {
    fontFamily: "Popins",
    fontSize: scale(16),
    color: primary,
  },
  name: {
    fontFamily: "Popins",
    fontSize: scale(15),
    marginTop: verticalScale(-10),
    marginBottom: verticalScale(20),
    color: text,
  },
  rights: {
    fontFamily: "Popins",
    fontSize: scale(12),
    color: primary,
    marginTop: scale(10),
  },
  rights1: {
    fontFamily: "Popins",
    fontSize: scale(12),
    color: primary,
    marginBottom: verticalScale(10),
  },
});
