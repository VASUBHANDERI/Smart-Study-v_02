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
import Graph from "../components/Graph";

Text.defaultProps = {
  ...(Text.defaultProps || {}),
  allowFontScaling: false,
};
const DiskManagementScreen = () => {
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
    <View style={{ backgroundColor: background, flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          backgroundColor: background,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingVertical: verticalScale(15) }}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: background,
              paddingBottom: verticalScale(25),
            }}
          >
            <View
              style={{
                marginBottom: scale(15),
                borderWidth: scale(1),
                borderRadius: scale(20),
                borderColor: main,
                width: scale(340),
                paddingHorizontal: scale(5),
              }}
            >
              <View
                style={{
                  borderRadius: scale(20),
                  backgroundColor: "#00000000",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    marginVertical: verticalScale(10),
                    alignItems: "stretch",
                    alignContent: "flex-start",
                    alignSelf: "flex-start",
                    marginLeft: scale(10),
                  }}
                >
                  <Text style={styles.head2}>Enter Total No. of tracks: </Text>
                  <TextInput
                    style={{
                      width: scale(40),
                      fontSize: scale(14),
                      paddingLeft: scale(5),
                      paddingBottom: verticalScale(5),
                      color: primary,
                      outline: "none",
                      borderBottomColor: primary,
                      borderBottomWidth: 1,
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
                      size={scale(20)}
                      color={main}
                      style={{ marginLeft: scale(55), marginRight: scale(5) }}
                    />
                  ) : null}
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginVertical: verticalScale(10),
                    alignItems: "stretch",
                    alignContent: "flex-start",
                    alignSelf: "flex-start",
                    marginLeft: scale(10),
                  }}
                >
                  <Text style={styles.head2}>
                    Enter Current Position of Head:{" "}
                  </Text>
                  <TextInput
                    style={{
                      width: scale(40),
                      marginRight: scale(15),
                      fontSize: scale(14),
                      paddingLeft: scale(5),
                      paddingBottom: verticalScale(5),
                      color: primary,
                      outline: "none",
                      borderBottomColor: primary,
                      borderBottomWidth: 1,
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
                      size={scale(20)}
                      color={main}
                      style={{ marginLeft: scale(-12) }}
                    />
                  ) : null}
                </View>
              </View>

              {state.basicInfoCollected ? (
                <Button
                  title={"Try Another Example"}
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
                />
              ) : (
                <Button
                  title={"Confirm"}
                  onPress={() => {
                    const parsedTotalTrack = parseInt(totalTrack);
                    const parsedCurrentPosition = parseInt(currentPosition);

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
                  s
                />
              )}

              {state.basicInfoCollected ? (
                <View
                  style={{
                    flexDirection: "row",
                    marginVertical: verticalScale(10),
                    alignItems: "flex-end",
                    alignContent: "flex-start",
                    alignSelf: "flex-start",
                    marginLeft: scale(10),
                  }}
                >
                  {state.requestSequence.length < 10 &&
                  state.showRun == false ? (
                    <>
                      <Text style={styles.head2}>Enter Request Sequence: </Text>

                      <TextInput
                        style={{
                          width: scale(60),
                          fontSize: scale(14),
                          paddingHorizontal: scale(10),
                          paddingBottom: verticalScale(5),
                          color: primary,
                          outline: "none",
                          borderBottomColor: primary,
                          borderBottomWidth: 1,
                        }}
                        underlineColorAndroid={"#00000050"}
                        value={inputValue}
                        onChangeText={(text) => setInputValue(text)}
                        keyboardType="numeric"
                      />
                      <Button
                        title="Add"
                        onPress={() => {
                          if (isNaN(inputValue)) {
                            setInputValue("");
                          } else if (
                            state.requestSequence.includes(
                              parseInt(inputValue)
                            ) ||
                            state.currentPosition === parseInt(inputValue) ||
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
                      />
                    </>
                  ) : (
                    <View
                      style={{
                        marginTop: verticalScale(10),
                      }}
                    >
                      <Text style={styles.head2}>Request Sequence: </Text>
                    </View>
                  )}
                </View>
              ) : null}
              <View
                style={{ alignSelf: "center", marginTop: verticalScale(10) }}
              >
                <FlatList
                  style={{ maxHeight: verticalScale(45) }}
                  data={state.requestSequence}
                  renderItem={({ item }) => (
                    <View style={styles.item}>
                      <Text style={{ color: "#4f8a01" }}>{item}</Text>
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
                  marginVertical: verticalScale(10),
                  alignItems: "stretch",
                  alignContent: "flex-start",
                  justifyContent: "space-around",
                }}
              >
                {state.requestSequence.length > 0 && state.showRun == false ? (
                  <>
                    <Button
                      title={"Clear"}
                      onPress={() => {
                        clear(state.selectedAlgorithm);

                        setRefresh(!refresh);
                      }}
                    />

                    <Button
                      title={"Confirm"}
                      onPress={() => {
                        state.showRun = true;
                        setRefresh(!refresh);
                      }}
                    />

                    <Button
                      title={"Remove"}
                      onPress={() => {
                        remove(state.selectedAlgorithm);
                        setRefresh(!refresh);
                      }}
                    />
                  </>
                ) : state.showRun ? (
                  <Button
                    title={"Edit the Request Sequence"}
                    onPress={() => {
                      state.showRun = false;
                      setRefresh(!refresh);
                    }}
                  />
                ) : null}
              </View>
              {state.showRun ? (
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
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
                  </View>
                  <View style={{ flexDirection: "row" }}>
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
                        marginTop: verticalScale(15),
                      }}
                    >
                      <Text style={styles.head2}>
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
                  <Button
                    title={"Run"}
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
                  />
                </View>
              ) : null}
            </View>
            {state.showScheduledGraph ? (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    borderColor: primary,
                    borderWidth: scale(1),
                    alignItems: "center",
                    paddingVertical: verticalScale(10),
                    marginBottom: verticalScale(5),
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
                        size={40}
                        color={main}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity>
                      <Ionicons
                        name="chevron-back-outline"
                        size={40}
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
                            fontSize: scale(13.5),
                          }}
                        >
                          Initially the Head is at Position{" "}
                          {state.currentPosition}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "Popins",
                            marginLeft: scale(5),
                            fontSize: scale(13.5),
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
                            fontSize: scale(13.5),
                          }}
                        >
                          Initially the Head is at Position{" "}
                          {state.currentPosition}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "Popins",
                            marginLeft: scale(5),
                            fontSize: scale(13.5),
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
                            fontSize: scale(13.5),
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
                            fontSize: scale(13.5),
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
                            fontSize: scale(13.5),
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
                            fontSize: scale(13.5),
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
                            fontSize: scale(13.5),
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
                            fontSize: scale(13.5),
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
                        size={40}
                        color={main}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity>
                      <Ionicons
                        name="chevron-forward-outline"
                        size={40}
                        color={"#E07A5F50"}
                      />
                    </TouchableOpacity>
                  )}
                </View>
                <View
                  style={{
                    marginTop: verticalScale(10),
                    paddingHorizontal: scale(10),
                  }}
                >
                  <Text style={styles.head2}>
                    Total Distance Covered by Head is {state.totalDistance}{" "}
                    units.{" "}
                  </Text>
                </View>
              </>
            ) : null}
            {state.showScheduledGraph && state.requestSequence.length > 0 ? (
              <View style={{ alignSelf: "flex-start" }}>
                <Graph />
              </View>
            ) : null}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DiskManagementScreen;

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
});
