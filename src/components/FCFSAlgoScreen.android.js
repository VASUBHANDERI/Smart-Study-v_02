import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
  Vibration,
  ToastAndroid,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import React, { useState, useContext } from "react";
import { Context as AlgoContext } from "../context/schedulingAlgoContext";
import { Feather, Ionicons } from "@expo/vector-icons";
import Bar from "./Bar";
import { useFonts } from "expo-font";
import { main, primary, text, background } from "./Colors";
import Button from "../components/Button";
import { processColor } from "./Colors";
import { back } from "react-native/Libraries/Animated/Easing";
import ProgressiveBar from "./ProgressiveBar.android";

const FCFSAlgoScreen = () => {
  const [arrTime, setArrTime] = useState(0);
  const [Bursttime, setBursttime] = useState(0);
  const [curTime, setCurTime] = useState(0);
  const { width } = Dimensions.get("window");
  const [refresh, setRefresh] = useState(false);
  const { addProcess, state, clear, schedule } = useContext(AlgoContext);

  const timeLine = [...state.FCFStimeLine, -1];
  const waitingTimeLine = [...state.FCFSwaitingTimeLine, [-1]];

  const [loaded] = useFonts({
    Popins: require("../../public/assets/fonts/Poppins-Light.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: background, width: "100%" }}
      nestedScrollEnabled={true}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ width: width }}>
        <View
          style={{
            justifyContent: "space-evenly",
            flex: 1,
            padding: scale(10),
            paddingRight: scale(15),
            paddingLeft: scale(20),
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "stretch",
              alignContent: "flex-start",
              justifyContent: "space-around",
            }}
          >
            <View>
              <Text
                style={{
                  alignSelf: "center",
                  color: text,
                  fontSize: scale(16),
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
                  padding: scale(5),
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
                      ToastAndroid.show(
                        "Sorry! Can't decrease Arrival Time anymore!",
                        ToastAndroid.SHORT
                      );
                    }
                  }}
                >
                  <Feather name="minus-circle" size={scale(30)} color={text} />
                </TouchableOpacity>
                <Text
                  style={{
                    paddingHorizontal: scale(15),
                    color: text,
                    fontSize: scale(16),
                    alignSelf: "center",
                    fontFamily: "Popins",
                    width: Dimensions.get("window").width * 0.14,
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
                      ToastAndroid.show(
                        "Sorry! Can't increase Arrival Time anymore!",
                        ToastAndroid.SHORT
                      );
                    }
                  }}
                >
                  <Feather name="plus-circle" size={scale(30)} color={text} />
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <Text
                style={{
                  alignSelf: "center",
                  color: text,
                  fontSize: scale(16),
                  fontFamily: "Popins",
                }}
              >
                Burst Time
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "center",
                  margin: scale(10),
                  padding: scale(5),
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
                      ToastAndroid.show(
                        "Sorry! Can't decrease Burst Time anymore!",
                        ToastAndroid.SHORT
                      );
                    }
                  }}
                >
                  <Feather name="minus-circle" size={scale(30)} color={text} />
                </TouchableOpacity>
                <Text
                  style={{
                    paddingHorizontal: scale(15),
                    color: text,
                    fontSize: scale(16),
                    alignSelf: "center",
                    fontFamily: "Popins",
                    width: Dimensions.get("window").width * 0.14,
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
                      ToastAndroid.show(
                        "Sorry! Can't increase Burst Time anymore!",
                        ToastAndroid.SHORT
                      );
                    }
                  }}
                >
                  <Feather name="plus-circle" size={scale(30)} color={text} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginVertical: verticalScale(10),
            alignItems: "stretch",
            alignContent: "flex-start",
            justifyContent: "space-around",
          }}
        >
          <Button
            title="Clear"
            onPress={() => {
              clear("FCFS");
              setArrTime(0);
              setBursttime(0);
              setRefresh(!refresh);
              setCurTime(0);
            }}
          />

          <Button
            title="Schedule"
            onPress={() => {
              if (state.FCFSprocess.length > 0) {
                schedule("FCFS");
                setRefresh(!refresh);
                setCurTime(0);
              } else {
                ToastAndroid.show(
                  "Please add the processes ",
                  ToastAndroid.SHORT
                );
              }
            }}
          />
          <Button
            title="Add"
            onPress={() => {
              {
                if (
                  arrTime >= 0 &&
                  Bursttime > 0 &&
                  state.FCFSprocess.length < 4
                ) {
                  setArrTime(arrTime);
                  setBursttime(Bursttime);
                  addProcess(arrTime, Bursttime, "FCFS");
                  setArrTime(0);
                  setBursttime(0);
                  setRefresh(!refresh);
                } else if (Bursttime <= 0) {
                  ToastAndroid.show("Invalid Burst Time!", ToastAndroid.SHORT);
                } else {
                  ToastAndroid.show(
                    "You Can't add more processes.",
                    ToastAndroid.SHORT
                  );
                }
              }
            }}
          />
        </View>
      </View>

      {state.FCFSshowProcess ? (
        <>
          <Text
            style={{
              ...styles.text,
              fontSize: scale(18),
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
              alignSelf: "center",
              width: width,
              paddingHorizontal: scale(10),
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
          <View>
            <FlatList
              style={{ alignSelf: "center", flex: 1 }}
              data={state.FCFSprocess}
              renderItem={({ item }) => {
                return (
                  <View
                    style={{
                      ...styles.line,
                      width: width,
                      paddingHorizontal: scale(10),
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
                            width: scale(17),
                            height: verticalScale(17),
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
          </View>
        </>
      ) : null}

      {state.FCFSshowScheduled ? (
        <View
          styles={{
            flex: 1,
          }}
        >
          <Text
            style={{
              ...styles.text,
              fontSize: scale(18),
              alignSelf: "center",
              marginTop: verticalScale(10),
            }}
          >
            Gantt Chart
          </Text>
          <View
            style={{ marginBottom: verticalScale(5), marginLeft: scale(10) }}
          >
            <Bar isScheduled={state.FCFSisScheduled} type={"FCFS"} />
          </View>
        </View>
      ) : null}

      {state.FCFSshowScheduled ? (
        <View style={{ marginBottom: verticalScale(20) }}>
          <Text
            style={{
              ...styles.text,
              fontSize: scale(18),
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
              alignSelf: "center",
              width: Dimensions.get("window").width * 0.95,
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
          {state.FCFSisScheduled ? (
            <View>
              <FlatList
                data={state.FCFSscheduledProcess}
                style={{ alignSelf: "center", flex: 1 }}
                renderItem={({ item }) => {
                  return (
                    <View
                      style={{
                        ...styles.line,
                        width: Dimensions.get("window").width * 0.95,
                      }}
                    >
                      <View style={styles.tableBox}>
                        <Text style={styles.text}>{`P${item.id}`}</Text>
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
            </View>
          ) : null}
        </View>
      ) : null}

      {state.FCFSshowScheduled ? (
        <>
          <Text
            style={{
              ...styles.text,
              fontSize: scale(18),
              padding: scale(10),
              marginTop: verticalScale(5),
              alignSelf: "center",
            }}
          >
            Steps Visualizer
          </Text>
          <View style={{ borderWidth: scale(1), borderColor: primary }}>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: verticalScale(10),
                // borderWidth: scale(1),
                // borderColor: primary,
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
                  size={scale(40)}
                  color={main}
                />
              </TouchableOpacity>
              {state.FCFSisScheduled ? (
                <View
                  style={{
                    alignItems: "center",
                    flex: 1,
                    // justifyContent:'center'
                    borderWidth: scale(1),
                    borderColor: background,
                  }}
                >
                  <View
                    style={{
                      borderColor: background,
                      borderWidth: scale(1),
                      flex: 1,
                      justifyContent: "center",
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

                    <View style={{ marginTop: verticalScale(5) }}>
                      <Text style={{ ...styles.text, alignSelf: "center" }}>
                        CPU
                      </Text>
                      {timeLine[curTime] == -1 ? (
                        <View
                          style={{
                            width: Dimensions.get("screen").width * 0.08,
                            height: Dimensions.get("screen").width * 0.08,
                            backgroundColor: "#CAE9FF",
                            alignSelf: "center",
                            marginBottom: verticalScale(10),
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
                            width: Dimensions.get("screen").width * 0.08,
                            height: Dimensions.get("screen").width * 0.08,
                            backgroundColor: "#CAE9FF",
                            alignSelf: "center",
                            marginBottom: verticalScale(10),
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

                      <Text style={{ ...styles.text, alignSelf: "center" }}>
                        Ready Queue
                      </Text>
                      {waitingTimeLine[curTime][0] != -1 ? (
                        <FlatList
                          style={{
                            height: Dimensions.get("screen").width * 0.08,
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
                                  width: Dimensions.get("screen").width * 0.08,
                                  height: Dimensions.get("screen").width * 0.08,
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
                            height: Dimensions.get("screen").width * 0.08,

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
                                  width: Dimensions.get("screen").width * 0.08,
                                  height: Dimensions.get("screen").width * 0.08,
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
                  if (curTime < state.FCFSwaitingTimeLine.length - 1) {
                    setCurTime(curTime + 1);
                    console.log(curTime);
                  } else if (curTime == state.FCFStimeLine.length - 1) {
                    setCurTime(curTime + 1);
                    // setEnded(true);
                  }
                  setRefresh(!refresh);
                }}
              >
                <Ionicons
                  name="chevron-forward-outline"
                  size={scale(40)}
                  color={main}
                />
              </TouchableOpacity>
            </View>
            {state.FCFSshowScheduled && state.FCFSisScheduled ? (
              <ProgressiveBar
                isScheduled={state.FCFSisScheduled}
                curTime={curTime}
                type={"FCFS"}
              />
            ) : null}
          </View>
        </>
      ) : null}
    </ScrollView>
  );
};

export default FCFSAlgoScreen;

const styles = StyleSheet.create({
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
