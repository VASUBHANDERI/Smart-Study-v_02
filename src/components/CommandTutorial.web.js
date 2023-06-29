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
Text.defaultProps = {
  ...(Text.defaultProps || {}),
  allowFontScaling: false,
};
const CommandTutorial = ({ command, content, argument, executable }) => {
  const [loaded] = useFonts({
    Popins: require("../../assets/fonts/Poppins-Light.ttf"),
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
            size={scale(24)}
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

const styles = ScaledSheet.create({
  container: {
    margin: "2@s",
    padding: "5@s",
  },
  headerContainer: {
    borderTopLeftRadius: "10@s",
    borderTopEndRadius: "10@s",
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  headerContainerPro: {
    padding: "10@s",
    backgroundColor: "#E07A50",
    borderTopLeftRadius: "10@s",
    borderTopEndRadius: "10@s",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  contentContainer: {
    padding: "10@s",
    paddingLeft: "8@s",
    backgroundColor: "#e5e5e580",
    borderBottomEndRadius: "10@s",
    borderBottomLeftRadius: "10@s",
  },
  Heading: {
    fontSize: "30@s",
    fontFamily: "Popins",
    fontWeight: "500",
    color: background,
  },
  content: {
    fontSize: "16@s",
    fontFamily: "Popins",
  },
  argument: {
    fontSize: "25@s",
    marginLeft: "5@s",
    color: "grey",
    fontFamily: "Popins",
  },
});
