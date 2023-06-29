import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
  Vibration,
} from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import React, { useState, useContext } from "react";
import { Context as AlgoContext } from "../context/schedulingAlgoContext";
import { Feather, Ionicons } from "@expo/vector-icons";
import Bar from "../components/Bar";
import { useFonts } from "expo-font";
import { main, primary, text, background } from "../components/Colors";
import Button from "../components/Button";
import { processColor } from "../components/Colors";
import { back } from "react-native/Libraries/Animated/Easing";
import ProgressiveBar from "../components/ProgressiveBar";
import FCFSAlgoScreen from "../components/FCFSAlgoScreen";
import SJFAlgoScreen from "../components/SJFAlgoScreen";
import SRTFAlgoScreen from "../components/SRTFAlgoScreen";
import PriorityAlgoScreen from "../components/PriorityAlgoScreen";
import PrePriorityAlgoScreen from "../components/PrePriorityAlgoScreen";

const CPUSchedulingScreen = () => {
  const [arrTime, setArrTime] = useState(0);
  const [Bursttime, setBursttime] = useState(0);
  const [curTime, setCurTime] = useState(0);
  const [priority, setPriority] = useState(0);
  const { width, height } = Dimensions.get("window");
  const [refresh, setRefresh] = useState(false);
  const {
    addProcess,
    state,
    clear,
    schedule,
    changeTheAlgo,
    addProcessWithPR,
  } = useContext(AlgoContext);

  const timeLine = [...state.FCFStimeLine, -1];
  const waitingTimeLine = [...state.FCFSwaitingTimeLine, [-1]];

  const [loaded] = useFonts({
    Popins: require("../../assets/fonts/Poppins-Light.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={{ backgroundColor: background, flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          backgroundColor: background,
        }}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            paddingVertical: verticalScale(15),
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
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
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View
              style={{
                flexDirection: "row",
                marginVertical: verticalScale(10),
                alignItems: "stretch",
                alignContent: "flex-start",
                justifyContent: "space-around",
                width: width,
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
            </View>
          </View>
          <View style={{ margin: 5 }}>
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
        </View>
      </ScrollView>
    </View>
  );
};

export default CPUSchedulingScreen;

const styles = StyleSheet.create({
  heading: {
    fontFamily: "Popins",
    fontSize: scale(35),
    fontWeight: "400",
    marginTop: verticalScale(5),
    marginBottom: verticalScale(10),
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
    fontSize: scale(20),
    marginTop: verticalScale(10),
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
  item: {
    backgroundColor: "#81f51b50",
    width: scale(30),
    height: scale(30),
    alignItems: "center",
    paddingTop: scale(5),
    marginRight: scale(2),
    borderRadius: scale(5),
  },
  line: {
    flexDirection: "row",
    alignItems: "center",
  },
  tableBox: {
    flex: 1,
    borderWidth: scale(1),
    borderColor: primary,
    alignContent: "center",
    paddingLeft: scale(1),
    backgroundColor: background,
    alignItems: "center",
  },
  text: {
    color: text,
    fontFamily: "Popins",
  },
});
