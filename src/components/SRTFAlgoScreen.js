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
import Bar from "./Bar";
import { useFonts } from "expo-font";
import { main, primary, text, background } from "./Colors";
import Button from "./Button";
import { processColor } from "./Colors";
import ProgressiveBar from "./ProgressiveBar";
import useWindowSize from "../Hooks/useWindowSize";
import getMediaQuery from "../Hooks/getMediaQuery";

const SRTFAlgoScreen = () => {
  const [arrTime, setArrTime] = useState(0);
  const [Bursttime, setBursttime] = useState(0);
  const [curTime, setCurTime] = useState(0);

  const [refresh, setRefresh] = useState(false);
  const { addProcess, state, clear, schedule } = useContext(AlgoContext);

  const timeLine = [...state.SRTFtimeLine, -1];
  const waitingTimeLine = [...state.SRTFwaitingTimeLine, [-1]];
  const [width, height] = useWindowSize();

  const [isMobileWidth, isTabletWidth, isDesktopWidth, isWide] =
    getMediaQuery();
  const algoWidth = isWide ? width * 0.6 : width;
  const algoHeight = isWide ? height : height * 0.6;
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
    },
    line: {
      flexDirection: "row",
      alignItems: "center",
    },
    tableBox: {
      flex: 1,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: primary,
      alignContent: "center",
      paddingLeft: scale(1),
      backgroundColor: background,
      alignItems: "center",
    },
    text: {
      color: text,
      fontFamily: "Popins",
      fontSize: algoWidth / 53,
    },
    buttonText: {
      color: "#6930C3",
      fontSize: algoWidth / 53,
      alignSelf: "center",
      fontFamily: "Popins",
    },
  });

  const [loaded] = useFonts({
    Popins: require("../../public/assets/fonts/Poppins-Light.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: background }}
      nestedScrollEnabled={true}
      showsVerticalScrollIndicator={false}
    >
      <View>
        <View
          style={{
            justifyContent: "space-evenly",
            flex: 1,
            padding: scale(10),
            paddingRight: scale(15),
            paddingLeft: scale(20),
            flexDirection: "row",
          }}
        >
          <View>
            <Text
              style={{
                alignSelf: "center",
                color: text,
                fontSize: algoWidth / 53,
                fontFamily: "Popins",
              }}
            >
              Arrival Time
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignSelf: "center",
                margin: scale(5),
                padding: algoWidth / 100,
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  if (arrTime > 0) {
                    setArrTime(arrTime - 1);
                    Vibration.vibrate(80);
                  } else {
                    alert("Sorry! Can't decrease Arrival Time anymore!");
                  }
                }}
              >
                <Feather
                  name="minus-circle"
                  size={algoWidth / 30}
                  color={text}
                />
              </TouchableOpacity>
              <Text
                style={{
                  paddingHorizontal: algoWidth / 30,
                  color: text,
                  fontSize: algoWidth / 53,
                  alignSelf: "center",
                  fontFamily: "Popins",
                }}
              >
                {arrTime}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  if (arrTime < 5) {
                    setArrTime(arrTime + 1);
                    Vibration.vibrate(80);
                  } else {
                    alert("Sorry! Can't increase Arrival Time anymore!");
                  }
                }}
              >
                <Feather
                  name="plus-circle"
                  size={algoWidth / 30}
                  color={text}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text
              style={{
                alignSelf: "center",
                color: text,
                fontSize: algoWidth / 53,
                fontFamily: "Popins",
              }}
            >
              Burst Time
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignSelf: "center",
                margin: scale(5),
                padding: algoWidth / 100,
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  if (Bursttime > 0) {
                    setBursttime(Bursttime - 1);
                    Vibration.vibrate(80);
                  } else {
                    alert("Sorry! Can't decrease Burst Time anymore!");
                  }
                }}
              >
                <Feather
                  name="minus-circle"
                  size={algoWidth / 30}
                  color={text}
                />
              </TouchableOpacity>
              <Text
                style={{
                  paddingHorizontal: scale(15),
                  color: text,
                  fontSize: algoWidth / 53,
                  alignSelf: "center",
                  fontFamily: "Popins",
                }}
              >
                {Bursttime}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  if (Bursttime < 5) {
                    setBursttime(Bursttime + 1);
                    Vibration.vibrate(80);
                  } else {
                    alert("Sorry! Can't increase Burst Time anymore!");
                  }
                }}
              >
                <Feather
                  name="plus-circle"
                  size={algoWidth / 30}
                  color={text}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginVertical: algoWidth / 53,
            alignItems: "stretch",
            alignContent: "flex-start",
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              clear("SRTF");
              setArrTime(0);
              setBursttime(0);
              setRefresh(!refresh);
              setCurTime(0);
            }}
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>Clear</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (state.SRTFprocess.length > 0) {
                schedule("SRTF");
                setRefresh(!refresh);
                setCurTime(0);
              } else {
                alert("Please add the processes ");
              }
            }}
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>Schedule</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              {
                if (
                  arrTime >= 0 &&
                  Bursttime > 0 &&
                  state.SRTFprocess.length < 4
                ) {
                  setArrTime(arrTime);
                  setBursttime(Bursttime);
                  addProcess(arrTime, Bursttime, "SRTF");
                  setArrTime(0);
                  setBursttime(0);
                  setRefresh(!refresh);
                } else if (Bursttime <= 0) {
                  alert("Invalid Burst Time!");
                } else {
                  alert("You Can't add more processes.");
                }
              }
            }}
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>Add</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {state.SRTFshowProcess ? (
        <>
          <Text
            style={{
              ...styles.text,
              fontSize: algoWidth / 53,
              padding: scale(10),
              paddingTop: verticalScale(5),
              alignSelf: "center",
            }}
          >
            Processes
          </Text>
          <View
            style={{
              ...styles.line,
              alignSelf: "stretch",
            }}
          >
            <View style={styles.tableBox}>
              <Text style={styles.text}>Id</Text>
            </View>
            <View style={styles.tableBox}>
              <Text style={styles.text}>Arrival Time</Text>
            </View>
            <View style={styles.tableBox}>
              <Text style={styles.text}>Burst Time</Text>
            </View>
          </View>
          <FlatList
            style={{ alignSelf: "strech", flex: 1 }}
            data={state.SRTFprocess}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    ...styles.line,
                    // width: width,
                    alignSelf: "stretch",
                    // paddingHorizontal: scale(10),
                  }}
                >
                  <View style={styles.tableBox}>
                    <View
                      style={{
                        flexDirection: "row",
                        flex: 1,
                        alignContent: "space-around",
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: processColor[item.id],
                          width: algoWidth / 53,
                          height: algoWidth / 53,
                          borderRadius: scale(7),
                          marginHorizontal: scale(5),
                          alignSelf: "center",
                        }}
                      ></View>
                      <Text style={styles.text}>{`P${item.id}`}</Text>
                    </View>
                  </View>
                  <View style={styles.tableBox}>
                    <Text style={styles.text}>{item.arrTime}</Text>
                  </View>
                  <View style={styles.tableBox}>
                    <Text style={styles.text}>{item.burstTime}</Text>
                  </View>
                </View>
              );
            }}
          />
        </>
      ) : null}

      {state.SRTFshowScheduled ? (
        <View>
          <Text
            style={{
              ...styles.text,
              fontSize: algoWidth / 53,
              alignSelf: "center",
              marginTop: verticalScale(10),
            }}
          >
            Gantt Chart
          </Text>
          <View
            style={{ marginBottom: verticalScale(5), marginLeft: scale(10) }}
          >
            <Bar isScheduled={state.SRTFisScheduled} type={"SRTF"} />
          </View>
        </View>
      ) : null}

      {state.SRTFshowScheduled ? (
        <View style={{ marginBottom: verticalScale(20) }}>
          <Text
            style={{
              ...styles.text,
              fontSize: algoWidth / 53,
              padding: scale(10),
              marginTop: verticalScale(5),
              alignSelf: "center",
            }}
          >
            Time Analysis
          </Text>
          <View
            style={{
              ...styles.line,
              alignSelf: "stretch",
            }}
          >
            <View style={styles.tableBox}>
              <Text style={styles.text}>Id</Text>
            </View>
            <View style={styles.tableBox}>
              <Text style={styles.text}>AT</Text>
            </View>
            <View style={styles.tableBox}>
              <Text style={styles.text}>BT</Text>
            </View>
            <View style={styles.tableBox}>
              <Text style={styles.text}>CT</Text>
            </View>
            <View style={styles.tableBox}>
              <Text style={styles.text}>TAT</Text>
            </View>
            <View style={styles.tableBox}>
              <Text style={styles.text}>WT</Text>
            </View>
          </View>
          {state.SRTFisScheduled ? (
            <FlatList
              data={state.SRTFscheduledProcess}
              style={{ alignSelf: "stretch", flex: 1 }}
              renderItem={({ item }) => {
                return (
                  <View
                    style={{
                      ...styles.line,
                    }}
                  >
                    <View style={styles.tableBox}>
                      <View
                        style={{
                          flexDirection: "row",
                          flex: 1,
                          alignContent: "space-around",
                        }}
                      >
                        <View
                          style={{
                            backgroundColor: processColor[item.id],
                            width: algoWidth / 53,
                            height: algoWidth / 53,
                            borderRadius: scale(7),
                            marginHorizontal: scale(5),
                            alignSelf: "center",
                          }}
                        ></View>
                        <Text style={styles.text}>{`P${item.id}`}</Text>
                      </View>
                    </View>
                    <View style={styles.tableBox}>
                      <Text style={styles.text}>{item.arrTime}</Text>
                    </View>
                    <View style={styles.tableBox}>
                      <Text style={styles.text}>{item.burstTime}</Text>
                    </View>
                    <View style={styles.tableBox}>
                      <Text style={styles.text}>{item.ct}</Text>
                    </View>
                    <View style={styles.tableBox}>
                      <Text style={styles.text}>{item.tat}</Text>
                    </View>
                    <View style={styles.tableBox}>
                      <Text style={styles.text}>{item.wt}</Text>
                    </View>
                  </View>
                );
              }}
            />
          ) : null}
        </View>
      ) : null}

      {state.SRTFshowScheduled ? (
        <>
          <Text
            style={{
              ...styles.text,
              fontSize: algoWidth / 40,
              padding: algoWidth / 100,
              marginTop: algoWidth / 53,
              alignSelf: "center",
            }}
          >
            Steps Visualizer
          </Text>

          <View style={{ borderWidth: algoWidth / 400, borderColor: primary }}>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  if (curTime > 0) {
                    setCurTime(curTime - 1);
                    console.log(curTime);
                  }
                  setRefresh(!refresh);
                }}
              >
                <Ionicons
                  name="chevron-back-outline"
                  size={algoWidth / 20}
                  color={main}
                />
              </TouchableOpacity>
              {state.SRTFisScheduled ? (
                <View
                  style={{
                    alignItems: "center",
                    flex: 1,
                    borderWidth: scale(1),
                    borderColor: background,
                  }}
                >
                  <View
                    style={{
                      borderColor: background,
                      borderWidth: scale(1),
                      flex: 1,
                      // justifyContent: "center",
                      alignContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.text,
                        marginBottom: verticalScale(5),
                        alignSelf: "center",
                      }}
                    >
                      Time = {curTime}
                    </Text>

                    <View
                      style={{
                        marginTop: verticalScale(5),
                        flexDirection: "row",
                        // flex: 1,
                        width: (algoWidth * 4) / 5,
                        alignSelf: "stretch",
                      }}
                    >
                      <View style={{ flex: 1, alignSelf: "center" }}>
                        <Text style={{ ...styles.text, alignSelf: "center" }}>
                          CPU
                        </Text>
                        {timeLine[curTime] == -1 ? (
                          <View
                            style={{
                              width: algoWidth * 0.05,
                              height: algoWidth * 0.05,
                              backgroundColor: "#CAE9FF",
                              alignSelf: "center",
                              marginBottom: algoWidth / 53,
                              justifyContent: "center",
                            }}
                          >
                            <Text
                              style={{
                                ...styles.text,
                                alignSelf: "center",
                                alignContent: "center",
                              }}
                            >
                              {" "}
                            </Text>
                          </View>
                        ) : (
                          <View
                            style={{
                              width: algoWidth * 0.05,
                              height: algoWidth * 0.05,
                              backgroundColor: "#CAE9FF",
                              marginBottom: algoWidth / 53,
                              alignSelf: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Text
                              style={{
                                ...styles.text,
                                alignSelf: "center",
                                alignContent: "center",
                              }}
                            >
                              {`P${timeLine[curTime]}`}
                            </Text>
                          </View>
                        )}
                      </View>
                      <View
                        style={{
                          flex: 1,
                          alignSelf: "center",
                        }}
                      >
                        <Text style={{ ...styles.text, alignSelf: "center" }}>
                          Ready Queue
                        </Text>
                        {waitingTimeLine[curTime][0] != -1 ? (
                          <FlatList
                            style={{
                              height: algoWidth * 0.05,
                              alignSelf: "center",
                              // borderWidth: 2,
                              // borderColor: "red",
                            }}
                            horizontal
                            data={waitingTimeLine[curTime]}
                            renderItem={({ item }) => {
                              return (
                                <View
                                  style={{
                                    width: algoWidth * 0.05,
                                    height: algoWidth * 0.05,
                                    backgroundColor: "#CAE9FF",
                                    justifyContent: "center",
                                    marginRight: scale(1),

                                    // borderWidth: scale(1),
                                    // borderColor: "#000",
                                  }}
                                >
                                  <Text
                                    style={{
                                      ...styles.text,
                                      alignSelf: "center",
                                      alignContent: "center",
                                    }}
                                  >
                                    P{item}
                                  </Text>
                                </View>
                              );
                            }}
                          />
                        ) : (
                          <FlatList
                            style={{
                              height: algoWidth * 0.05,

                              alignSelf: "center",
                            }}
                            horizontal
                            data={waitingTimeLine[curTime]}
                            renderItem={({ item }) => {
                              return (
                                <View
                                  style={{
                                    width: algoWidth * 0.05,
                                    height: algoWidth * 0.05,
                                    backgroundColor: "#CAE9FF",
                                    justifyContent: "center",
                                    marginRight: scale(1),
                                  }}
                                >
                                  <Text
                                    style={{
                                      ...styles.text,
                                      alignSelf: "center",
                                      alignContent: "center",
                                    }}
                                  >
                                    {" "}
                                  </Text>
                                </View>
                              );
                            }}
                          />
                        )}
                      </View>
                    </View>
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <Text style={styles.text}>
                    Please click on the Schedule Button
                  </Text>

                  <View></View>
                </View>
              )}

              <TouchableOpacity
                onPress={() => {
                  if (curTime < state.SRTFwaitingTimeLine.length - 1) {
                    setCurTime(curTime + 1);
                    console.log(curTime);
                  } else if (curTime == state.SRTFtimeLine.length - 1) {
                    setCurTime(curTime + 1);
                    // setEnded(true);
                  }
                  setRefresh(!refresh);
                }}
              >
                <Ionicons
                  name="chevron-forward-outline"
                  size={algoWidth / 20}
                  color={main}
                />
              </TouchableOpacity>
            </View>
            {state.SRTFshowScheduled && state.SRTFisScheduled ? (
              <ProgressiveBar
                isScheduled={state.SRTFisScheduled}
                curTime={curTime}
                type={"SRTF"}
              />
            ) : null}
          </View>
        </>
      ) : null}
    </ScrollView>
  );
};

export default SRTFAlgoScreen;
