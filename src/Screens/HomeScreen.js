import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import { background, main, main50, primary, text } from "../components/Colors";
import { useFonts } from "expo-font";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import { scale, verticalScale } from "react-native-size-matters";
import getMediaQuery from "../Hooks/getMediaQuery";
import { Context as AuthContext } from "../context/authContext";
import InterviewModal from "../components/InterviewModal";

Text.defaultProps = {
  ...(Text.defaultProps || {}),
  allowFontScaling: false,
};

const HomeScreen = () => {
  const [isMobileWidth, isTabletWidth, isDesktopWidth] = getMediaQuery();
  const [isModalVisible, setModalVisible] = useState(false);

  const { signout } = useContext(AuthContext);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
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
      // marginVertical: 10,
      color: primary,
      // marginLeft: scale(5),
    },
    modalButton: {
      position: "absolute",
      bottom: 20,
      right: 20,
      backgroundColor: main,
      borderRadius: 50,
      width: 60,
      height: 60,
      justifyContent: "center",
      alignItems: "center",
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
        ? 20
        : isTabletWidth
        ? 20
        : isDesktopWidth
        ? 25
        : null,
      color: text,
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
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 30,
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
                ? 95
                : null
            }
            color={main}
            style={{ marginRight: scale(5) }}
          />
          <View
            style={{
              // justifyContent: "center",
              alignItems: "flex-start",
              marginLeft: scale(0),
              marginTop: verticalScale(-1),
            }}
          >
            <Text style={styles.heading}>Smart Study</Text>
            <Text style={[styles.name, { color: primary,marginTop: verticalScale(-5) }]}>
              Your Path to Smart Learning
            </Text>
          </View>
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
              <Text style={[styles.head1]}> (Developer)</Text>
            </View>
            <View style={styles.nameRow}>
              <Text style={[styles.name]}>Vishnu Bhanderi</Text>
              <Text style={[styles.head1]}> (Developer)</Text>
            </View>
            <View style={styles.nameRow}>
              <Text style={[styles.name]}>Dr. Nileshchandra Pikle</Text>
              <Text style={[styles.head1]}> (Mentor)</Text>
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
          <TouchableOpacity onPress={toggleModal} style={styles.modalButton}>
            <FontAwesome5
              name="chalkboard-teacher"
              size={24}
              color={background}
            />
          </TouchableOpacity>

          {/* Interview Modal */}

          <InterviewModal isVisible={isModalVisible} closeModal={toggleModal} />
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
