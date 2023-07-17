import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { main, primary, text, background } from "./Colors";
import { useFonts } from "expo-font";
import {
  scale,
  verticalScale,
  moderateScale,
  ScaledSheet,
} from "react-native-size-matters";
const Selector = ({ title, currValue, onPress, style }) => {
  const [loaded] = useFonts({
    Popins: require("../../public/assets/fonts/Poppins-Light.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={
          currValue == title
            ? styles.selectAlgoButton
            : styles.notSelectAlgoButton
        }
      >
        <Text
          style={
            currValue == title
              ? styles.selectAlgoButtonText
              : styles.notSelectAlgoButtonText
          }
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Selector;

const styles = ScaledSheet.create({
  selectAlgoButton: {
    margin: scale(4),
    borderRadius: scale(10),
    borderColor: background,
    borderWidth: scale(1),
    padding: scale(8),
    backgroundColor: main,
    alignSelf: "center",
  },
  selectAlgoButtonText: {
    color: background,
    fontSize: scale(15),
  },
  notSelectAlgoButton: {
    margin: scale(4),
    borderRadius: scale(10),
    borderColor: main,
    borderWidth: scale(1),
    padding: scale(8),
    backgroundColor: background,
    alignSelf: "center",
  },
  notSelectAlgoButtonText: {
    color: main,
    fontSize: scale(15),
  },
});
