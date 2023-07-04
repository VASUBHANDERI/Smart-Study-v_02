import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { scale, verticalScale } from "react-native-size-matters";
import { background, main, main50, primary } from "../components/Colors";
import { Context as AlgoContext } from "../context/pageReplacementAlgoContext";
import { useFonts } from "expo-font";
import Animated, {
  FadeIn,
  SlideInRight,
} from "react-native-reanimated";

import Button from "../components/Button";
import { Ionicons } from "@expo/vector-icons";

Text.defaultProps = {
  ...(Text.defaultProps || {}),
  allowFontScaling: false,
};
const { width } = Dimensions.get("window");

const PageReplacementAlgorithmsScreen = () => {
  const { state, addPage, clear, remove, schedule, changeTheAlgo } =
    useContext(AlgoContext);
  const [refresh, setRefresh] = useState(true);
  const [curTime, setCurTime] = useState(0);

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
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  if (state.requestSequence.length < 10) {
                    addPage(1);
                    setRefresh(!refresh);
                  } else {
                    ToastAndroid.show(
                      "Sorry! Can't add more pages",
                      ToastAndroid.SHORT
                    );
                  }
                }}
              >
                <View
                  style={{
                    ...styles.processButton,
                    backgroundColor: "#d9ed92",
                  }}
                >
                  <Text style={styles.normalText}>1</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (state.requestSequence.length < 10) {
                    addPage(2);
                    setRefresh(!refresh);
                  } else {
                    ToastAndroid.show(
                      "Sorry! Can't add more pages",
                      ToastAndroid.SHORT
                    );
                  }
                }}
              >
                <View
                  style={{
                    ...styles.processButton,
                    backgroundColor: "#76c893",
                  }}
                >
                  <Text style={styles.normalText}>2</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (state.requestSequence.length < 10) {
                    addPage(3);
                    setRefresh(!refresh);
                  } else {
                    ToastAndroid.show(
                      "Sorry! Can't add more pages",
                      ToastAndroid.SHORT
                    );
                  }
                }}
              >
                <View
                  style={{
                    ...styles.processButton,
                    backgroundColor: "#168aad",
                  }}
                >
                  <Text style={styles.normalText}>3</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (state.requestSequence.length < 10) {
                    addPage(4);
                    setRefresh(!refresh);
                  } else {
                    ToastAndroid.show(
                      "Sorry! Can't add more pages",
                      ToastAndroid.SHORT
                    );
                  }
                }}
              >
                <View
                  style={{
                    ...styles.processButton,
                    backgroundColor: "#9FE2BF",
                  }}
                >
                  <Text style={styles.normalText}>4</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (state.requestSequence.length < 10) {
                    addPage(5);
                    setRefresh(!refresh);
                  } else {
                    ToastAndroid.show(
                      "Sorry! Can't add more pages",
                      ToastAndroid.SHORT
                    );
                  }
                }}
              >
                <View
                  style={{
                    ...styles.processButton,
                    backgroundColor: "#0096FF",
                  }}
                >
                  <Text style={styles.normalText}>5</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View
              style={{
                alignItems: "center",
                paddingVertical: verticalScale(10),
              }}
            >
              {state.requestSequence.length > 0 ? (
                <FlatList
                  data={state.requestSequence}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item, index }) => {
                    return (
                      <Animated.View
                        style={[
                          styles.sequenceBox,
                          state.showScheduled && index === curTime
                            ? { borderColor: primary, borderWidth: scale(2) }
                            : null,
                        ]}
                        entering={FadeIn.duration(700)}
                      >
                        <Text style={styles.normalText}>{item}</Text>
                      </Animated.View>
                    );
                  }}
                />
              ) : (
                <View style={{ height: width * 0.1, justifyContent: "center" }}>
                  <Text
                    style={{
                      fontFamily: "Popins",
                      fontSize: scale(10),
                      color: primary,
                      alignSelf: "center",
                    }}
                  >
                    *Click on above buttons to add the pages into the sequence.
                  </Text>
                </View>
              )}
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
                      clear();
                      setRefresh(!refresh);
                    }}
                  />

                  <Button
                    title={"Confirm"}
                    onPress={() => {
                      if (state.requestSequence.length > 0) {
                        state.showRun = true;
                        setRefresh(!refresh);
                      } else {
                        ToastAndroid.show(
                          "Please add the pages first!",
                          ToastAndroid.SHORT
                        );
                      }
                    }}
                  />

                  <Button
                    title={"Remove"}
                    onPress={() => {
                      remove();
                      setRefresh(!refresh);
                    }}
                  />
                </>
              ) : state.showRun ? (
                <Button
                  title={"Edit the Request Sequence"}
                  onPress={() => {
                    state.showRun = false;
                    state.showScheduled = false;
                    setRefresh(!refresh);
                  }}
                />
              ) : null}
            </View>

            {state.showRun ? (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    style={
                      state.selectedAlgorithm == "FIFO"
                        ? styles.selectAlgoButton
                        : styles.notSelectAlgoButton
                    }
                    onPress={() => {
                      changeTheAlgo("FIFO");
                      setRefresh(!refresh);
                    }}
                  >
                    <Text
                      style={
                        state.selectedAlgorithm == "FIFO"
                          ? styles.selectAlgoButtonText
                          : styles.notSelectAlgoButtonText
                      }
                    >
                      FIFO
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={
                      state.selectedAlgorithm == "LRU"
                        ? styles.selectAlgoButton
                        : styles.notSelectAlgoButton
                    }
                    onPress={() => {
                      changeTheAlgo("LRU");
                      setRefresh(!refresh);
                    }}
                  >
                    <Text
                      style={
                        state.selectedAlgorithm == "LRU"
                          ? styles.selectAlgoButtonText
                          : styles.notSelectAlgoButtonText
                      }
                    >
                      LRU
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={
                      state.selectedAlgorithm == "MRU"
                        ? styles.selectAlgoButton
                        : styles.notSelectAlgoButton
                    }
                    onPress={() => {
                      changeTheAlgo("MRU");
                      setRefresh(!refresh);
                    }}
                  >
                    <Text
                      style={
                        state.selectedAlgorithm == "MRU"
                          ? styles.selectAlgoButtonText
                          : styles.notSelectAlgoButtonText
                      }
                    >
                      MRU
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    marginVertical: verticalScale(10),
                    alignItems: "stretch",
                    alignContent: "flex-start",
                    justifyContent: "space-around",
                  }}
                >
                  <Button
                    title={"Run"}
                    onPress={() => {
                      schedule(state.selectedAlgorithm);
                      setRefresh(!refresh);
                      setCurTime(0);
                    }}
                  />
                </View>
              </View>
            ) : null}
          </View>
          {state.showScheduled ? (
            <View
              style={{
                flexDirection: "row",
                borderColor: primary,
                borderLeftWidth: 0,
                borderRightWidth: 0,
                borderTopWidth: scale(1),
                borderBottomWidth: scale(1),
                alignItems: "center",
                paddingVertical: verticalScale(10),
                marginBottom: verticalScale(5),
              }}
            >
              {curTime > 0 ? (
                <TouchableOpacity
                  onPress={() => {
                    if (curTime > 0) {
                      setCurTime(curTime - 1);
                    }
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
                    color={main50}
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
                  Time = {curTime}
                </Text>
                {state.hitMissArray[curTime] === -1 ? (
                  <Text
                    style={{
                      fontFamily: "Popins",
                      marginLeft: scale(5),
                      fontSize: scale(13.5),
                    }}
                  >
                    Page {state.requestSequence[curTime]} is Missed.
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontFamily: "Popins",
                      marginLeft: scale(5),
                      fontSize: scale(13.5),
                    }}
                  >
                    Page {state.requestSequence[curTime]} is Hit.
                  </Text>
                )}
                {state.replacedArray[curTime] != 0 ? (
                  <View style={{ marginTop: 3 }}>
                    <Text
                      style={{
                        fontFamily: "Popins",
                        marginLeft: scale(5),
                        fontSize: scale(13.5),
                      }}
                    >
                      Page {state.requestSequence[curTime]} is replaced with the
                      Page {state.replacedArray[curTime]} ,
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Popins",
                        marginLeft: scale(5),
                        fontSize: scale(13.5),
                      }}
                    >
                      because we are using {state.selectedAlgorithm} algorithm.
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Popins",
                        marginLeft: scale(5),
                        fontSize: scale(13.5),
                      }}
                    >
                      And Page {state.replacedArray[curTime]} came earliest in
                      the RAM.
                    </Text>
                  </View>
                ) : (
                  <View style={{ marginTop: 3 }}>
                    <Text
                      style={{
                        fontFamily: "Popins",
                        marginLeft: scale(5),
                        fontSize: scale(13.5),
                      }}
                    >
                      No need of replacement.
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Popins",
                        marginLeft: scale(5),
                        fontSize: scale(13.5),
                      }}
                    >
                      {" "}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Popins",
                        marginLeft: scale(5),
                        fontSize: scale(13.5),
                      }}
                    >
                      {" "}
                    </Text>
                  </View>
                )}
              </View>
              {curTime < state.requestSequence.length - 1 ? (
                <TouchableOpacity
                  onPress={() => {
                    if (curTime < state.requestSequence.length - 1) {
                      setCurTime(curTime + 1);
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
                    color={main50}
                  />
                </TouchableOpacity>
              )}
            </View>
          ) : null}

          {state.showScheduled ? (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              {curTime === state.requestSequence.length - 1 ? (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    width: width,
                  }}
                >
                  <Text style={styles.normalText}>
                    Hit Ratio : {state.HitRatio}
                  </Text>
                  <Text style={styles.normalText}>
                    Miss Ratio: {state.MissRatio}
                  </Text>
                </View>
              ) : (
                <Text> </Text>
              )}

              <View
                style={{
                  justifyContent: "center",
                  marginTop: verticalScale(10),
                  flexDirection: "row",
                  alignContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                  marginLeft: scale(10),
                }}
              >
                <FlatList
                  contentContainerStyle={{
                    alignSelf: "center",
                    alignContent: "space-around",
                    justifyContent: "center",
                  }}
                  data={state.ScheduledArray}
                  numColumns={5}
                  keyExtractor={(item, index) => `outer_${index}`} // Generate unique key for outer FlatList
                  renderItem={({ item, index }) => {
                    if (index <= curTime) {
                      return (
                        <View
                          style={{
                            marginBottom: verticalScale(10),
                            alignItems: "center",
                            marginRight: scale(20),
                          }}
                        >
                          <Animated.FlatList
                            entering={SlideInRight}
                            data={item}
                            keyExtractor={(item, index) => `inner_${index}`} // Generate unique key for inner FlatList
                            renderItem={({ item }) => {
                              return (
                                <Animated.View
                                  style={styles.sequenceBox}
                                  entering={SlideInRight}
                                >
                                  {item > 0 ? (
                                    <Text style={styles.normalText}>
                                      {item}
                                    </Text>
                                  ) : (
                                    <Text style={styles.normalText}> </Text>
                                  )}
                                </Animated.View>
                              );
                            }}
                          />
                          {state.hitMissArray[index] === -1 ? (
                            <Animated.View
                              entering={SlideInRight}
                              style={{
                                ...styles.sequenceBox,
                                marginTop: verticalScale(10),
                                backgroundColor: "#FF7F5095",
                              }}
                            >
                              <Text style={styles.normalText}>M</Text>
                            </Animated.View>
                          ) : (
                            <Animated.View
                              entering={SlideInRight}
                              style={{
                                ...styles.sequenceBox,
                                marginTop: verticalScale(10),
                                backgroundColor: "#9FE2BF",
                              }}
                            >
                              <Text style={styles.normalText}>H</Text>
                            </Animated.View>
                          )}
                        </View>
                      );
                    }
                  }}
                />
              </View>
            </View>
          ) : (
            <Text style={styles.normalText}></Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default PageReplacementAlgorithmsScreen;

const styles = StyleSheet.create({
  processButton: {
    height: width * 0.12,
    width: width * 0.12,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    margin: scale(10),
    borderRadius: width * 0.12,
  },

  sequenceBox: {
    height: width * 0.09,
    width: width * 0.09,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    margin: scale(1),
    backgroundColor: "#CAE9FF",
  },
  normalText: {
    fontFamily: "Popins",
  },
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
