import { StyleSheet, Text, View, Image, Button } from "react-native";
import React, { useContext } from "react";
import { background, main, main50, primary } from "../components/Colors";
import { useFonts } from "expo-font";
import { Entypo } from "@expo/vector-icons";
import { scale } from "react-native-size-matters";
import getMediaQuery from "../Hooks/getMediaQuery";
import { Context as AuthContext } from "../context/authContext";

Text.defaultProps = {
  ...(Text.defaultProps || {}),
  allowFontScaling: false,
};

const HomeScreen = () => {
  const [isMobileWidth, isTabletWidth, isDesktopWidth] = getMediaQuery();
  const { signout } = useContext(AuthContext);

  const styles = StyleSheet.create({
    heading: {
      fontFamily: "Popins",
      fontSize: isMobileWidth
        ? 45
        : isTabletWidth
        ? 50
        : isDesktopWidth
        ? 55
        : null,
      fontWeight: "400",
      marginVertical: 10,
      color: primary,
      marginLeft: scale(5),
    },

    head1: {
      fontFamily: "Popins",
      fontSize: isMobileWidth
        ? 20
        : isTabletWidth
        ? 23
        : isDesktopWidth
        ? 25
        : null,
      color: primary,
      alignSelf: "center",
    },
    head2: {
      fontFamily: "Popins",
      fontSize: isMobileWidth
        ? 19
        : isTabletWidth
        ? 23
        : isDesktopWidth
        ? 30
        : null,
      color: primary,
    },
    name: {
      fontFamily: "Popins",
      fontSize: isMobileWidth
        ? 30
        : isTabletWidth
        ? 30
        : isDesktopWidth
        ? 35
        : null,
      color: primary,
    },
    rights: {
      fontFamily: "Popins",
      fontSize: isMobileWidth
        ? 12
        : isTabletWidth
        ? 15
        : isDesktopWidth
        ? 15
        : null,
      color: primary,
      marginTop: 10,
      alignSelf: "center",
    },
    rights1: {
      fontFamily: "Popins",
      fontSize: isMobileWidth
        ? 12
        : isTabletWidth
        ? 15
        : isDesktopWidth
        ? 15
        : null,
      color: primary,
      marginBottom: 10,
      alignSelf: "center",
    },
    nameRow: {
      flexDirection: "row",
      alignContent: "center",
      alignItems: "center",
      marginVertical: 4,
    },
  });

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
          flex: 1,
        }}
      >
        <Button title="Logout" onPress={signout} />
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 10,
            flexDirection: "row",
          }}
        >
          <Entypo
            name="network"
            size={
              isMobileWidth
                ? 55
                : isTabletWidth
                ? 60
                : isDesktopWidth
                ? 75
                : null
            }
            color={main}
            style={{ marginRight: scale(5) }}
          />

          <Text style={styles.heading}>Smart Study</Text>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View style={styles.nameRow}>
              <Text style={[styles.name]}>Vasu Bhanderi</Text>
              <Text style={[styles.head1]}>(Developer)</Text>
            </View>
            <View style={styles.nameRow}>
              <Text style={[styles.name]}>Vishnu Bhanderi</Text>
              <Text style={[styles.head1]}>(Developer)</Text>
            </View>
            <View style={styles.nameRow}>
              <Text style={[styles.name]}>Dr. Nileshchandra Pikle</Text>
              <Text style={[styles.head1]}>(Mentor)</Text>
            </View>
          </View>
          <View
            style={{
              alignItems: "center",
              marginVertical: 20,
            }}
          >
            <Image
              source={require("../../public/assets/IIITN.png")}
              style={{
                height: isMobileWidth
                  ? 120
                  : isTabletWidth
                  ? 140
                  : isDesktopWidth
                  ? 150
                  : null,
                width: isMobileWidth
                  ? 120
                  : isTabletWidth
                  ? 140
                  : isDesktopWidth
                  ? 150
                  : null,
              }}
            />
            <Text numberOfLines={1} style={styles.head2}>
              Indian Institute of Information Technology, Nagpur
            </Text>
          </View>
          <Text style={styles.rights}>Copyright © 2023 SmartStudy</Text>
          <Text style={styles.rights1}>All rights reserved</Text>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
