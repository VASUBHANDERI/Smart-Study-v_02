import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { background, primary } from "./Colors";
import { useFonts } from "expo-font";
import {
  scale,
  verticalScale,
  moderateScale,
  ScaledSheet,
} from "react-native-size-matters";
import useWindowSize from "../Hooks/useWindowSize";
Text.defaultProps = {
  ...(Text.defaultProps || {}),
  allowFontScaling: false,
};
const CommandTutorial = ({ command, content, argument, executable }) => {
    const [width, height] = useWindowSize();

  const [loaded] = useFonts({
    Popins: require("../../public/assets/fonts/Poppins-Light.ttf"),
  });
  if (!loaded) {
    return null;
  }
  if (executable) {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainerPro}>
          <View style={styles.headerContainer}>
            <Text style={styles.Heading}>{command}</Text>
            <Text style={styles.argument}>{argument}</Text>
          </View>
          <MaterialIcons
            name="event-available"
            size={scale(18)}
            color="green"
          />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.content}>{content}</Text>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainerPro}>
          <View style={styles.headerContainer}>
            <Text style={styles.Heading}>{command}</Text>
            <Text style={styles.argument}>{argument}</Text>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.content}>{content}</Text>
        </View>
      </View>
    );
  }
};

export default CommandTutorial;

const styles = StyleSheet.create({
  container: {
    margin: scale(2),
    padding: scale(5),
  },
  headerContainer: {
    borderTopLeftRadius: scale(5),
    borderTopEndRadius: scale(5),
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  
  },
  headerContainerPro: {
    padding: scale(5),
    paddingVertical:verticalScale(1),
    backgroundColor: "#E07A50",
    borderTopLeftRadius: scale(5),
    borderTopEndRadius: scale(5),
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  contentContainer: {
    padding: scale(1),
    paddingLeft: scale(8),
    backgroundColor: "#e5e5e580",
    borderBottomEndRadius: scale(5),
    borderBottomLeftRadius: scale(5),
  },
  Heading: {
    fontSize: scale(12),
    fontFamily: "Popins",
    fontWeight: "500",
    color: background,
  },
  content: {
    fontSize: scale(8),
    fontFamily: "Popins",
  },
  argument: {
    fontSize: scale(10),
    marginLeft: scale(5),
    color: "grey",
    fontFamily: "Popins",
  },
});
