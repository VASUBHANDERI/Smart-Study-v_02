import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { main, primary, text } from "./Colors";
import { useFonts } from "expo-font";
import {
  scale,
  verticalScale,
  moderateScale,
  ScaledSheet,
} from "react-native-size-matters";
const Button = ({ title, onPress }) => {
  const [loaded] = useFonts({
    Popins: require("../../assets/fonts/Poppins-Light.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = ScaledSheet.create({
  container: {
    margin: "5@s",
    padding: "5@s",
    borderRadius: "10@s",
    borderColor: "#6930C3",
    borderWidth: "1@s",
    backgroundColor: "#CAE9FF",
  },
  text: {
    color: "#6930C3",
    fontSize: "16@s",
    alignSelf: "center",
    fontFamily: "Popins",
  },
});
