import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { background, main, primary } from "../components/Colors";
import { useFonts } from "expo-font";
import { Entypo } from "@expo/vector-icons";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  runOnJS,
} from "react-native-reanimated";
Text.defaultProps = {
  ...(Text.defaultProps || {}),
  allowFontScaling: false,
};
import Button from "../components/Button";

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
        backgroundColor: background,
        alignContent: "center",
        flex: 1,
      }}
    >
      <View
        style={{
          alignItems: "center",

          backgroundColor: background,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: background,
            paddingVertical: verticalScale(10),
            // paddingLeft: scale(10),
            flexDirection: "row",
          }}
        >
          <Entypo
            name="network"
            size={scale(70)}
            color={main}
            style={{ marginRight: scale(5) }}
          />

          <Text style={styles.heading}>Smart Study</Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            // borderColor: "Green",
            // borderWidth: 3,
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              // borderColor: "red",
              // borderWidth: 3,
            }}
          >
            <View style={styles.nameRow}>
              <Text style={styles.name}>Dr. Nileshchandra Pikle </Text>
              <Text style={styles.head1}>(Mentor)</Text>
            </View>
            <View style={styles.nameRow}>
              <Text style={styles.name}>Vasu Bhanderi </Text>
              <Text style={styles.head1}>(Developer)</Text>
            </View>
            <View style={styles.nameRow}>
              <Text style={styles.name}>Vishnu Bhanderi </Text>
              <Text style={styles.head1}>(Developer)</Text>
            </View>
          </View>
          <View
            style={{
              alignItems: "center",
              marginBottom: verticalScale(20),
              // borderColor: "red",
              // borderWidth: 3,
            }}
          >
            <Image
              source={require("../../public/assets/IIITN.png")}
              style={{ height: verticalScale(65), width: scale(65) }}
            />
            <Text style={styles.head2}>
              Indian Institute of Information Technology, Nagpur
            </Text>
          </View>
        </View>
      </View>
      <View style={{ alignItems: "center", backgroundColor: background }}>
        <Text style={styles.rights}>Copyright © 2023 SmartStudy</Text>
        <Text style={styles.rights1}>All rights reserved</Text>
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
    marginBottom: verticalScale(5),
    color: primary,
    marginLeft: scale(5),
  },
  head1: {
    fontFamily: "Popins",
    fontSize: scale(14),
    color: primary,
    alignSelf: "center",
  },
  head2: {
    fontFamily: "Popins",
    fontSize: scale(16),
    color: primary,
  },
  name: {
    fontFamily: "Popins",
    fontSize: scale(20),
    // marginTop: verticalScale(10),
    color: primary,
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
  nameRow: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    marginVertical: scale(4),
  },
});
