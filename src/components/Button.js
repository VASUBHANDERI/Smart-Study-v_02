import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import React from "react";
import { background, main, main50, primary, text } from "./Colors";
import { useFonts } from "expo-font";
import {
  scale,
  verticalScale,
  moderateScale,
  ScaledSheet,
} from "react-native-size-matters";
import useWindowSize from "../Hooks/useWindowSize";

const isWeb = Platform.OS === "web";
const Button = ({ title, onPress }) => {
  const [width, height] = useWindowSize();

  const [loaded] = useFonts({
    Popins: require("../../public/assets/fonts/Poppins-Light.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = ScaledSheet.create({
  text: {
    color: "#6930C3",
    fontSize: !isWeb ? "16@s" : "10@s",
    alignSelf: "center",
    fontFamily: "Popins",
  },
  button: {
    shadowColor: "#00000040", // IOS
    shadowOffset: { height: scale(1), width: scale(1) }, // IOS
    shadowOpacity: scale(1), // IOS
    shadowRadius: scale(1), //IOS
    backgroundColor: "#CAE9FF",
    elevation: verticalScale(10), // Android
    justifyContent: "center",
    alignItems: "center",
    padding: !isWeb ? scale(5) : scale(2),
    paddingHorizontal: scale(5),
    borderRadius: !isWeb ? scale(5) : scale(2),
  },
});
