import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import React, { useState, useContext } from "react";
import { Context as AlgoContext } from "../context/schedulingAlgoContext";
import { useFonts } from "expo-font";
import { main, primary, text, background } from "../components/Colors";
import FCFSAlgoScreen from "../components/FCFSAlgoScreen";
import SJFAlgoScreen from "../components/SJFAlgoScreen";
import SRTFAlgoScreen from "../components/SRTFAlgoScreen";
import PriorityAlgoScreen from "../components/PriorityAlgoScreen";
import PrePriorityAlgoScreen from "../components/PrePriorityAlgoScreen";
import useWindowSize from "../Hooks/useWindowSize";
import getMediaQuery from "../Hooks/getMediaQuery";

const CPUSchedulingScreen = () => {
  const [width, height] = useWindowSize();
  const [refresh, setRefresh] = useState(false);
  const { state, changeTheAlgo } = useContext(AlgoContext);

  const [loaded] = useFonts({
    Popins: require("../../public/assets/fonts/Poppins-Light.ttf"),
  });

  const [isMobileWidth, isTabletWidth, isDesktopWidth, isWide] =
    getMediaQuery();
  const algoWidth = isWide ? width * 0.6 : width;
  const algoHeight = isWide ? height : height * 0.6;

  const styles = StyleSheet.create({
    selectAlgoButton: {
      marginHorizontal: scale(2),
      borderRadius: scale(5),
      borderColor: main,
      borderWidth: scale(1),
      paddingVertical: algoHeight / 100,
      paddingHorizontal: algoWidth / 53,
      backgroundColor: main,
      alignSelf: "center",
      shadowColor: "#00000040", // IOS
      shadowOffset: { height: scale(1), width: scale(1) }, // IOS
      shadowOpacity: scale(1), // IOS
      shadowRadius: scale(2), //IOS
      elevation: algoHeight / 100,
    },

    notSelectAlgoButton: {
      marginHorizontal: scale(2),
      borderRadius: scale(5),
      borderColor: main,
      borderWidth: scale(1),
      paddingVertical: algoHeight / 100,
      paddingHorizontal: algoHeight / 53,
      backgroundColor: background,
      alignSelf: "center",
      shadowColor: "#00000040", // IOS
      shadowOffset: { height: scale(1), width: scale(1) }, // IOS
      shadowOpacity: scale(1), // IOS
      shadowRadius: scale(2), //IOS
      elevation: algoHeight / 100,
    },
    selectAlgoButtonText: {
      color: background,
      fontSize: algoWidth / 53,
    },
    notSelectAlgoButtonText: {
      color: main,
      fontSize: algoWidth / 53,
    },
  });

  if (!loaded) {
    return null;
  }

  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: background,
        flex: 1,
        flexDirection: isWide ? "row" : "column",
      }}
    >
      <View style={{ flex: 4 }}>
        <ScrollView
          contentContainerStyle={{
            alignItems: "center",
            backgroundColor: background,
            borderRightColor: "grey",
            borderBottomColor: "grey",
            borderRightWidth: isWide ? algoWidth / 100 : 0,
            borderBottomWidth: isWide ? 0 : algoWidth / 100,
            flex: 1,
          }}
          showsVerticalScrollIndicator={true}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text>Content will be available soon!</Text>
            <Text>{width}</Text>
            <Text>{algoWidth}</Text>
          </View>
        </ScrollView>
      </View>

      <View style={{ flex: 6 }}>
        <ScrollView
          contentContainerStyle={{
            alignItems: "stretch",
            backgroundColor: background,
            paddingHorizontal: scale(5),
            paddingTop: algoWidth / 53,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              flexDirection: "row",
              marginVertical: algoWidth / 100,
              alignItems: "stretch",
              alignContent: "flex-start",
              justifyContent: "space-around",
              width: algoWidth,
            }}
          >
            <TouchableOpacity
              style={
                state.selectedAlgorithm == "FCFS"
                  ? styles.selectAlgoButton
                  : styles.notSelectAlgoButton
              }
              onPress={() => {
                changeTheAlgo("FCFS");
                setRefresh(!refresh);
              }}
            >
              <Text
                style={
                  state.selectedAlgorithm == "FCFS"
                    ? styles.selectAlgoButtonText
                    : styles.notSelectAlgoButtonText
                }
              >
                FCFS
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                state.selectedAlgorithm == "SJF"
                  ? styles.selectAlgoButton
                  : styles.notSelectAlgoButton
              }
              onPress={() => {
                changeTheAlgo("SJF");
                setRefresh(!refresh);
              }}
            >
              <Text
                style={
                  state.selectedAlgorithm == "SJF"
                    ? styles.selectAlgoButtonText
                    : styles.notSelectAlgoButtonText
                }
              >
                SJF
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                state.selectedAlgorithm == "SRTF"
                  ? styles.selectAlgoButton
                  : styles.notSelectAlgoButton
              }
              onPress={() => {
                changeTheAlgo("SRTF");
                setRefresh(!refresh);
              }}
            >
              <Text
                style={
                  state.selectedAlgorithm == "SRTF"
                    ? styles.selectAlgoButtonText
                    : styles.notSelectAlgoButtonText
                }
              >
                SRTF
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                state.selectedAlgorithm == "Priority"
                  ? styles.selectAlgoButton
                  : styles.notSelectAlgoButton
              }
              onPress={() => {
                changeTheAlgo("Priority");
                setRefresh(!refresh);
              }}
            >
              <Text
                style={
                  state.selectedAlgorithm == "Priority"
                    ? styles.selectAlgoButtonText
                    : styles.notSelectAlgoButtonText
                }
              >
                Priority
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                state.selectedAlgorithm == "Preemptive Priority"
                  ? styles.selectAlgoButton
                  : styles.notSelectAlgoButton
              }
              onPress={() => {
                changeTheAlgo("Preemptive Priority");
                setRefresh(!refresh);
              }}
            >
              <Text
                style={
                  state.selectedAlgorithm == "Preemptive Priority"
                    ? styles.selectAlgoButtonText
                    : styles.notSelectAlgoButtonText
                }
              >
                Preemptive Priority
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ margin: algoWidth / 53 }}>
            {state.selectedAlgorithm == "FCFS" ? (
              <FCFSAlgoScreen />
            ) : state.selectedAlgorithm == "SJF" ? (
              <SJFAlgoScreen />
            ) : state.selectedAlgorithm == "SRTF" ? (
              <SRTFAlgoScreen />
            ) : state.selectedAlgorithm == "Priority" ? (
              <PriorityAlgoScreen />
            ) : state.selectedAlgorithm == "Preemptive Priority" ? (
              <PrePriorityAlgoScreen />
            ) : null}
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default CPUSchedulingScreen;
