import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import { background, main, primary } from "../components/Colors";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { scale, verticalScale } from "react-native-size-matters";
import Button from "../components/Button";
import { Context as DiskContext } from "../context/diskManagementAlgoContext";
import useWindowSize from "../Hooks/useWindowSize";
import getMediaQuery from "../Hooks/getMediaQuery";
import GraphForWeb from "../components/GraphForWeb";
import DiskSchedulingTheory from "../components/TheoryComponents/DiskSchedulingTheory";

Text.defaultProps = {
  ...(Text.defaultProps || {}),
  allowFontScaling: false,
};

const DiskManagementScreen = () => {
  const [width, height] = useWindowSize();

  const [isMobileWidth, isTabletWidth, isDesktopWidth, isWide] =
    getMediaQuery();
  const algoWidth = isWide ? width * 0.6 : width;
  const algoHeight = isWide ? height : height * 0.6;

  const contentWidth = isWide ? width * 0.4 : width;
  const contentHeight = isWide ? height : height * 0.4;

  const styles = StyleSheet.create({
    button: {
      shadowColor: "#00000040", // IOS
      shadowOffset: { height: scale(1), width: scale(1) }, // IOS
      shadowOpacity: scale(1), // IOS
      shadowRadius: scale(1), //IOS
      backgroundColor: "#CAE9FF",
      elevation: algoHeight / 100, // Android
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: algoWidth / 53,
      paddingVertical: algoWidth / 100,
      borderRadius: algoWidth / 100,
      marginHorizontal: algoWidth / 100,
      marginTop: algoWidth / 100,
    },
    buttonText: {
      color: "#6930C3",
      fontSize: algoWidth / 53,
      alignSelf: "center",
      fontFamily: "Popins",
    },
    text: {
      fontFamily: "Popins",
      fontSize: algoWidth / 53,
      color: primary,
    },

    selectAlgoButton: {
      marginHorizontal: algoWidth / 100,
      borderRadius: algoWidth / 100,
      borderColor: main,
      borderWidth: algoWidth / 200,
      paddingVertical: algoWidth / 100,
      paddingHorizontal: algoWidth / 53,
      backgroundColor: main,
      alignSelf: "center",
      shadowColor: "#00000040", // IOS
      shadowOffset: { height: scale(1), width: scale(1) }, // IOS
      shadowOpacity: scale(1), // IOS
      shadowRadius: scale(2), //IOS
      elevation: algoWidth / 100,
    },

    notSelectAlgoButton: {
      marginHorizontal: algoWidth / 100,
      marginVertical: algoWidth / 100,
      borderRadius: algoWidth / 100,
      borderColor: main,
      borderWidth: algoWidth / 300,
      paddingVertical: algoWidth / 100,
      paddingHorizontal: algoWidth / 53,
      backgroundColor: background,
      alignSelf: "center",
      shadowColor: "#00000040", // IOS
      shadowOffset: { height: scale(1), width: scale(1) }, // IOS
      shadowOpacity: scale(1), // IOS
      shadowRadius: scale(2), //IOS
      elevation: algoWidth / 100,
    },
    selectAlgoButtonText: {
      color: background,
      fontSize: algoWidth / 53,
    },
    notSelectAlgoButtonText: {
      color: main,
      fontSize: algoWidth / 53,
    },
    item: {
      backgroundColor: "#81f51b50",
      width: algoWidth / 25,
      height: algoWidth / 25,
      alignItems: "center",
      padding: algoWidth / 100,
      marginRight: algoWidth / 200,
      borderRadius: algoWidth / 100,
    },
  });

  const {
    state,
    schedule,
    remove,
    clear,
    addRequest,
    stepChangeNext,
    stepChangeBack,
    changeTheAlgo,
  } = useContext(DiskContext);
  const [refresh, setRefresh] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [totalTrack, setTotaltrack] = useState("");
  const [currentPosition, setCurrentPosition] = useState("");
  const [curStep, setCurStep] = useState(null);
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
        flex: 1,
        flexDirection: isWide ? "row" : "column",
      }}
    >
      <View
        style={{
          flex: 4,
          borderRightColor: "grey",
          borderBottomColor: "grey",
          borderRightWidth: isWide ? algoWidth / 300 : 0,
          borderBottomWidth: isWide ? 0 : algoWidth / 300,
        }}
      >
        <ScrollView
          contentContainerStyle={{
            alignItems: "center",
            backgroundColor: background,

            flex: 1,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              padding: algoWidth / 80,
              margin: algoWidth / 50,
              width: contentWidth,
            }}
          >
            <DiskSchedulingTheory />
          </View>
        </ScrollView>
      </View>
      <View style={{ flex: 6 }}>
        <ScrollView
          contentContainerStyle={{
            alignItems: "center",
            backgroundColor: background,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: background,
              paddingVertical: algoWidth / 100,
            }}
          >
            <View
              style={{
                marginBottom: algoWidth / 53,
                borderWidth: algoWidth / 300,
                borderRadius: algoWidth / 30,
                borderColor: main,
                width: algoWidth - algoWidth / 10,
                paddingHorizontal: algoWidth / 50,
                // alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                }}
              >
                <View>
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        marginBottom: algoWidth / 100,
                        marginTop: algoWidth / 53,
                        alignContent: "flex-start",
                        alignSelf: "flex-start",
                      }}
                    >
                      <Text style={styles.text}>
                        Enter Total No. of tracks:{" "}
                      </Text>
                      <TextInput
                        style={{
                          width: (algoWidth / 53) * 3,
                          fontSize: algoWidth / 53,
                          paddingBottom: algoWidth / 150,
                          color: primary,
                          outline: "none",
                          borderBottomColor: primary,
                          borderBottomWidth: 1,
                          marginLeft: algoWidth / 100,
                        }}
                        autoFocus={false}
                        mode="outlined"
                        value={totalTrack}
                        onChangeText={(text) => setTotaltrack(text)}
                        keyboardType="numeric"
                        editable={!state.basicInfoCollected}
                      />
                      {state.basicInfoCollected ? (
                        <Fontisto
                          name="locked"
                          size={algoWidth / 53}
                          color={main}
                          style={{
                            alignSelf: "center",
                            marginHorizontal: algoWidth / 100,
                            paddingBottom: algoWidth / 100,
                          }}
                        />
                      ) : null}
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        marginBottom: algoWidth / 100,
                        marginTop: algoWidth / 53,
                        alignItems: "stretch",
                        alignContent: "flex-start",
                        alignSelf: "flex-start",
                      }}
                    >
                      <Text style={styles.text}>
                        Enter Current Position of Head:
                      </Text>
                      <TextInput
                        style={{
                          width: (algoWidth / 53) * 3,
                          fontSize: algoWidth / 53,
                          paddingBottom: algoWidth / 150,
                          color: primary,
                          outline: "none",
                          borderBottomColor: primary,
                          borderBottomWidth: 1,
                          marginLeft: algoWidth / 100,
                        }}
                        underlineColorAndroid={"#00000050"}
                        value={currentPosition}
                        onChangeText={(text) => setCurrentPosition(text)}
                        keyboardType="numeric"
                        editable={!state.basicInfoCollected}
                      />
                      {state.basicInfoCollected ? (
                        <Fontisto
                          name="locked"
                          size={algoWidth / 53}
                          color={main}
                          style={{
                            alignSelf: "center",
                            marginHorizontal: algoWidth / 100,
                            paddingBottom: algoWidth / 100,
                          }}
                        />
                      ) : null}
                    </View>
                  </View>

                  <View
                    style={{
                      alignItems: "center",
                      marginTop: algoWidth / 70,
                      marginBottom: algoWidth / 70,
                    }}
                  >
                    {state.basicInfoCollected ? (
                      <TouchableOpacity
                        onPress={() => {
                          state.basicInfoCollected = false;
                          state.showRun = false;
                          state.requestSequence = [];
                          state.scheduleSequence = [];
                          state.YAxisCoordinates = [];
                          state.FCFS = [];
                          state.SCAN = [];
                          state.CSCAN = [];
                          state.LOOK = [];
                          state.CLOOK = [];
                          state.SSTF = [];
                          state.showScheduledGraph = false;
                          setRefresh(!refresh);
                        }}
                      >
                        <View style={styles.button}>
                          <Text style={styles.buttonText}>
                            Try Another Example
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          const parsedTotalTrack = parseInt(totalTrack);
                          const parsedCurrentPosition =
                            parseInt(currentPosition);

                          if (
                            isNaN(parsedTotalTrack) ||
                            isNaN(parsedCurrentPosition)
                          ) {
                            alert(
                              "Please enter a valid value for Total Tracks and Current Position"
                            );
                          } else if (
                            parsedTotalTrack > 0 &&
                            parsedTotalTrack <= 100 &&
                            parsedCurrentPosition >= 0 &&
                            parsedCurrentPosition < parsedTotalTrack
                          ) {
                            state.totalTracks = parsedTotalTrack;
                            state.currentPosition = parsedCurrentPosition;
                            state.basicInfoCollected = true;
                          } else {
                            alert(
                              "Invalid Total Tracks or Current Head Position !\nTotal Tracks Limit is 100"
                            );
                          }

                          setRefresh(!refresh);
                        }}
                      >
                        <View style={styles.button}>
                          <Text style={styles.buttonText}>Confirm</Text>
                        </View>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
                <View style={{ flex: 1 }}>
                  <View>
                    {state.basicInfoCollected ? (
                      <View
                        style={{
                          flexDirection: "row",
                          marginTop: algoWidth / 170,
                          alignItems: "flex-end",
                          alignContent: "flex-start",
                          alignSelf: "flex-start",
                          marginLeft: scale(10),
                        }}
                      >
                        {state.requestSequence.length < 10 &&
                        state.showRun == false ? (
                          <>
                            <Text
                              style={[
                                styles.text,
                                { marginTop: -1 * (algoWidth / 53) },
                              ]}
                            >
                              Enter Request Sequence:
                            </Text>

                            <TextInput
                              style={{
                                width: (algoWidth / 53) * 3,
                                fontSize: algoWidth / 53,
                                paddingBottom: algoWidth / 150,
                                color: primary,
                                outline: "none",
                                borderBottomColor: primary,
                                borderBottomWidth: 1,
                                marginLeft: algoWidth / 100,
                              }}
                              underlineColorAndroid={"#00000050"}
                              value={inputValue}
                              onChangeText={(text) => setInputValue(text)}
                              keyboardType="numeric"
                            />
                            <TouchableOpacity
                              onPress={() => {
                                if (isNaN(inputValue)) {
                                  setInputValue("");
                                } else if (
                                  // state.requestSequence.includes(
                                  //   parseInt(inputValue)
                                  // ) ||
                                  // state.currentPosition ===
                                  //   parseInt(inputValue) ||
                                  parseInt(inputValue) > state.totalTracks ||
                                  parseInt(inputValue) < 0
                                ) {
                                  alert("Invalid Request!! ");
                                  setInputValue("");
                                } else {
                                  addRequest(parseInt(inputValue));
                                  setInputValue("");
                                  console.log(inputValue);
                                  setRefresh(!refresh);
                                }
                              }}
                            >
                              <View
                                style={[
                                  styles.button,
                                  { paddingVertical: algoWidth / 300 },
                                ]}
                              >
                                <Text style={styles.buttonText}>Add</Text>
                              </View>
                            </TouchableOpacity>
                          </>
                        ) : (
                          <View
                            style={{
                              marginTop: algoWidth / 53,
                            }}
                          >
                            <Text style={styles.text}>Request Sequence: </Text>
                          </View>
                        )}
                      </View>
                    ) : null}
                  </View>
                  <View
                    style={{
                      alignSelf: "center",
                      marginTop: algoWidth / 53,
                      alignContent: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FlatList
                      style={{ maxHeight: verticalScale(45) }}
                      data={state.requestSequence}
                      renderItem={({ item }) => (
                        <View style={styles.item}>
                          <Text
                            style={{
                              color: "#4f8a01",
                              fontSize: algoWidth / 63,
                            }}
                          >
                            {item}
                          </Text>
                        </View>
                      )}
                      keyExtractor={(item) => item}
                      horizontal
                      showsHorizontalScrollIndicator={true}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      marginVertical: algoWidth / 100,
                      marginTop: algoWidth / 40,
                      alignItems: "stretch",
                      alignContent: "flex-start",
                      justifyContent: "space-around",
                    }}
                  >
                    {state.requestSequence.length > 0 &&
                    state.showRun == false ? (
                      <>
                        <TouchableOpacity
                          onPress={() => {
                            clear(state.selectedAlgorithm);
                            setRefresh(!refresh);
                          }}
                        >
                          <View style={styles.button}>
                            <Text style={styles.buttonText}>Clear</Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            state.showRun = true;
                            setRefresh(!refresh);
                          }}
                        >
                          <View style={styles.button}>
                            <Text style={styles.buttonText}>Confirm</Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            remove(state.selectedAlgorithm);
                            setRefresh(!refresh);
                          }}
                        >
                          <View style={styles.button}>
                            <Text style={styles.buttonText}>Remove</Text>
                          </View>
                        </TouchableOpacity>
                      </>
                    ) : state.showRun ? (
                      <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity
                          onPress={() => {
                            state.showRun = false;
                            setRefresh(!refresh);
                          }}
                        >
                          <View style={styles.button}>
                            <Text style={styles.buttonText}>Edit</Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            schedule(state.selectedAlgorithm);
                            setRefresh(!refresh);
                            console.log("totalTracks");
                            console.log(state.selectedAlgorithm);
                            console.log(state.totalTracks);
                            console.log("currentPosition");
                            console.log(state.currentPosition);
                            console.log("requestSequence");
                            console.log(state.requestSequence);
                          }}
                        >
                          <View style={styles.button}>
                            <Text style={styles.buttonText}>Run</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    ) : null}
                  </View>
                </View>
              </View>

              {state.showRun ? (
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      style={
                        state.selectedAlgorithm == "SSTF"
                          ? styles.selectAlgoButton
                          : styles.notSelectAlgoButton
                      }
                      onPress={() => {
                        changeTheAlgo("SSTF");
                        setRefresh(!refresh);
                      }}
                    >
                      <Text
                        style={
                          state.selectedAlgorithm == "SSTF"
                            ? styles.selectAlgoButtonText
                            : styles.notSelectAlgoButtonText
                        }
                      >
                        SSTF
                      </Text>
                    </TouchableOpacity>
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
                        state.selectedAlgorithm == "SCAN"
                          ? styles.selectAlgoButton
                          : styles.notSelectAlgoButton
                      }
                      onPress={() => {
                        changeTheAlgo("SCAN");
                        setRefresh(!refresh);
                      }}
                    >
                      <Text
                        style={
                          state.selectedAlgorithm == "SCAN"
                            ? styles.selectAlgoButtonText
                            : styles.notSelectAlgoButtonText
                        }
                      >
                        SCAN
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={
                        state.selectedAlgorithm == "CSCAN"
                          ? styles.selectAlgoButton
                          : styles.notSelectAlgoButton
                      }
                      onPress={() => {
                        changeTheAlgo("CSCAN");
                        setRefresh(!refresh);
                      }}
                    >
                      <Text
                        style={
                          state.selectedAlgorithm == "CSCAN"
                            ? styles.selectAlgoButtonText
                            : styles.notSelectAlgoButtonText
                        }
                      >
                        CSCAN
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={
                        state.selectedAlgorithm == "LOOK"
                          ? styles.selectAlgoButton
                          : styles.notSelectAlgoButton
                      }
                      onPress={() => {
                        changeTheAlgo("LOOK");
                        setRefresh(!refresh);
                      }}
                    >
                      <Text
                        style={
                          state.selectedAlgorithm == "LOOK"
                            ? styles.selectAlgoButtonText
                            : styles.notSelectAlgoButtonText
                        }
                      >
                        LOOK
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={
                        state.selectedAlgorithm == "CLOOK"
                          ? styles.selectAlgoButton
                          : styles.notSelectAlgoButton
                      }
                      onPress={() => {
                        changeTheAlgo("CLOOK");
                        setRefresh(!refresh);
                      }}
                    >
                      <Text
                        style={
                          state.selectedAlgorithm == "CLOOK"
                            ? styles.selectAlgoButtonText
                            : styles.notSelectAlgoButtonText
                        }
                      >
                        CLOOK
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {state.selectedAlgorithm != "FCFS" &&
                  state.selectedAlgorithm != "SSTF" ? (
                    <View
                      style={{
                        alignSelf: "center",
                        marginTop: algoWidth / 100,
                        flexDirection: "row",
                      }}
                    >
                      <Text style={[styles.text, { alignSelf: "center" }]}>
                        Select the Direction of Head:{" "}
                      </Text>
                      <TouchableOpacity
                        style={
                          state.DirectionOfHead == 1
                            ? styles.selectAlgoButton
                            : styles.notSelectAlgoButton
                        }
                        onPress={() => {
                          state.DirectionOfHead = 1;
                          state.showScheduledGraph = false;
                          setRefresh(!refresh);
                        }}
                      >
                        <Text
                          style={
                            state.DirectionOfHead == 1
                              ? styles.selectAlgoButtonText
                              : styles.notSelectAlgoButtonText
                          }
                        >
                          Towards the larger value
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={
                          state.DirectionOfHead == 0
                            ? styles.selectAlgoButton
                            : styles.notSelectAlgoButton
                        }
                        onPress={() => {
                          state.DirectionOfHead = 0;
                          state.showScheduledGraph = false;
                          setRefresh(!refresh);
                        }}
                      >
                        <Text
                          style={
                            state.DirectionOfHead == 0
                              ? styles.selectAlgoButtonText
                              : styles.notSelectAlgoButtonText
                          }
                        >
                          Towards the smaller value
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : null}
                </View>
              ) : null}
            </View>
            {state.showScheduledGraph ? (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    borderColor: primary,
                    borderWidth: algoWidth / 300,
                    alignItems: "center",
                    paddingVertical: algoWidth / 53,
                    marginBottom: algoWidth / 100,
                    width: algoWidth - algoWidth / 10,
                    borderRadius: algoWidth / 30,
                  }}
                >
                  {state.scheduleSequence.length > 1 ? (
                    <TouchableOpacity
                      onPress={() => {
                        stepChangeBack(state.selectedAlgorithm);
                        setRefresh(!refresh);
                      }}
                    >
                      <Ionicons
                        name="chevron-back-outline"
                        size={algoWidth / 30}
                        color={main}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity>
                      <Ionicons
                        name="chevron-back-outline"
                        size={algoWidth / 30}
                        color={"#E07A5F50"}
                      />
                    </TouchableOpacity>
                  )}

                  <View
                    style={{
                      flex: 1,
                      alignSelf: "center",
                      flexWrap: "nowrap",
                    }}
                  >
                    <Text
                      style={{
                        alignSelf: "center",
                        fontFamily: "Popins",
                        marginBottom: verticalScale(5),
                        fontSize: algoWidth / 53,
                      }}
                    >
                      Step = {state.scheduleSequence.length - 1}
                    </Text>
                    {state.scheduleSequence.length === 1 &&
                    state.selectedAlgorithm == "FCFS" ? (
                      <>
                        <Text
                          style={{
                            fontFamily: "Popins",
                            marginLeft: scale(5),
                            fontSize: algoWidth / 53,
                          }}
                        >
                          Initially the Head is at Position{" "}
                          {state.currentPosition}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "Popins",
                            marginLeft: scale(5),
                            fontSize: algoWidth / 53,
                          }}
                        >
                          Now next request is{" "}
                          {state.FCFS[state.scheduleSequence.length]}, So
                          according to FCFS Disk Scheduling algorithm Head will
                          access Position{" "}
                          {state.FCFS[state.scheduleSequence.length]} in next
                          step.
                        </Text>
                      </>
                    ) : state.scheduleSequence.length == 1 &&
                      state.selectedAlgorithm != "FCFS" ? (
                      <>
                        <Text
                          style={{
                            fontFamily: "Popins",
                            marginLeft: scale(5),
                            fontSize: algoWidth / 53,
                          }}
                        >
                          Initially the Head is at Position{" "}
                          {state.currentPosition}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "Popins",
                            marginLeft: scale(5),
                            fontSize: algoWidth / 53,
                          }}
                        >
                          Now, according to {state.selectedAlgorithm} Disk
                          Scheduling algorithm Head will access Position{" "}
                          {state.selectedAlgorithm == "SCAN"
                            ? state.SCAN[state.scheduleSequence.length]
                            : state.selectedAlgorithm == "CSCAN"
                            ? state.CSCAN[state.scheduleSequence.length]
                            : state.selectedAlgorithm == "LOOK"
                            ? state.LOOK[state.scheduleSequence.length]
                            : state.selectedAlgorithm == "CLOOK"
                            ? state.CLOOK[state.scheduleSequence.length]
                            : state.selectedAlgorithm == "SSTF"
                            ? state.SSTF[state.scheduleSequence.length]
                            : null}{" "}
                          in next step.
                        </Text>
                      </>
                    ) : state.scheduleSequence.length > 1 &&
                      state.selectedAlgorithm == "FCFS" &&
                      state.scheduleSequence.length < state.FCFS.length ? (
                      <>
                        <Text
                          style={{
                            fontFamily: "Popins",
                            marginLeft: scale(5),
                            fontSize: algoWidth / 53,
                          }}
                        >
                          Now, the Head is at Position{" "}
                          {
                            state.scheduleSequence[
                              state.scheduleSequence.length - 1
                            ]
                          }
                        </Text>
                        <Text
                          style={{
                            fontFamily: "Popins",
                            marginLeft: scale(5),
                            fontSize: algoWidth / 53,
                          }}
                        >
                          Now next request is{" "}
                          {state.FCFS[state.scheduleSequence.length]}, So
                          according to FCFS Disk Scheduling algorithm Head will
                          access Position{" "}
                          {state.FCFS[state.scheduleSequence.length]} in next
                          step.
                        </Text>
                      </>
                    ) : state.scheduleSequence.length > 1 &&
                      state.selectedAlgorithm != "FCFS" &&
                      state.scheduleSequence.length <
                        state.YAxisCoordinates.length ? (
                      <>
                        <Text
                          style={{
                            fontFamily: "Popins",
                            marginLeft: scale(5),
                            fontSize: algoWidth / 53,
                          }}
                        >
                          Now, the Head is at Position{" "}
                          {
                            state.scheduleSequence[
                              state.scheduleSequence.length - 1
                            ]
                          }
                        </Text>
                        <Text
                          style={{
                            fontFamily: "Popins",
                            marginLeft: scale(5),
                            fontSize: algoWidth / 53,
                          }}
                        >
                          Now, according to {state.selectedAlgorithm} Disk
                          Scheduling algorithm Head will access Position{" "}
                          {state.selectedAlgorithm == "SCAN"
                            ? state.SCAN[state.scheduleSequence.length]
                            : state.selectedAlgorithm == "CSCAN"
                            ? state.CSCAN[state.scheduleSequence.length]
                            : state.selectedAlgorithm == "LOOK"
                            ? state.LOOK[state.scheduleSequence.length]
                            : state.selectedAlgorithm == "CLOOK"
                            ? state.CLOOK[state.scheduleSequence.length]
                            : state.selectedAlgorithm == "SSTF"
                            ? state.SSTF[state.scheduleSequence.length]
                            : null}{" "}
                          in next step.
                        </Text>
                      </>
                    ) : state.scheduleSequence.length ===
                      state.YAxisCoordinates.length ? (
                      <>
                        <Text
                          style={{
                            fontFamily: "Popins",
                            marginLeft: scale(5),
                            fontSize: algoWidth / 53,
                          }}
                        >
                          Now, the Head is at Position{" "}
                          {
                            state.scheduleSequence[
                              state.scheduleSequence.length - 1
                            ]
                          }
                        </Text>
                        <Text
                          style={{
                            fontFamily: "Popins",
                            marginLeft: scale(5),
                            fontSize: algoWidth / 53,
                          }}
                        >
                          Hence, all requests are entertained and our Disk
                          Scheduling is completed using{" "}
                          {state.selectedAlgorithm} Disk Scheduling algorithm
                        </Text>
                      </>
                    ) : null}
                  </View>
                  {state.scheduleSequence.length <
                  state.YAxisCoordinates.length ? (
                    <TouchableOpacity
                      onPress={() => {
                        if (
                          state.scheduleSequence.length <
                          state.YAxisCoordinates.length
                        ) {
                          stepChangeNext(state.selectedAlgorithm);
                          setRefresh(!refresh);
                        }
                      }}
                    >
                      <Ionicons
                        name="chevron-forward-outline"
                        size={algoWidth / 30}
                        color={main}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity>
                      <Ionicons
                        name="chevron-forward-outline"
                        size={algoWidth / 30}
                        color={"#E07A5F50"}
                      />
                    </TouchableOpacity>
                  )}
                </View>
                <View
                  style={{
                    marginTop: algoWidth / 200,
                    paddingHorizontal: algoWidth / 53,
                  }}
                >
                  <Text style={styles.text}>
                    Total Distance Covered by Head is {state.totalDistance}{" "}
                    units.{" "}
                  </Text>
                </View>
              </>
            ) : null}
            {state.showScheduledGraph && state.requestSequence.length > 0 ? (
              <>
                {/* <View
                style={{
                  alignSelf: "flex-start",
                  borderColor: "black",
                  borderWidth: 2,
                }}
              >
                <GraphForWeb2 />
              </View> */}

                <GraphForWeb />
              </>
            ) : null}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default DiskManagementScreen;
