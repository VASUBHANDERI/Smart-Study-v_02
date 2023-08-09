import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { background, main, main50, primary } from "../components/Colors";
import { Context as AlgoContext } from "../context/pageReplacementAlgoContext";
import { useFonts } from "expo-font";
import Animated, { FadeIn, SlideInRight } from "react-native-reanimated";

import Button from "../components/Button";
import { Ionicons } from "@expo/vector-icons";
import useWindowSize from "../Hooks/useWindowSize";
import getMediaQuery from "../Hooks/getMediaQuery";
import { back } from "react-native/Libraries/Animated/Easing";

Text.defaultProps = {
  ...(Text.defaultProps || {}),
  allowFontScaling: false,
};

const PageReplacementAlgorithmsScreen = () => {
  let { state, addPage, clear, remove, schedule, changeTheAlgo } =
    useContext(AlgoContext);

  const [refresh, setRefresh] = useState(true);
  const [curTime, setCurTime] = useState(0);
  const [width, height] = useWindowSize();

  const [isMobileWidth, isTabletWidth, isDesktopWidth, isWide] =
    getMediaQuery();
  const algoWidth = isWide ? width * 0.6 : width;
  const algoHeight = isWide ? height : height * 0.6;

  const [loaded] = useFonts({
    Popins: require("../../public/assets/fonts/Poppins-Light.ttf"),
  });

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
    text: {
      color: "#6930C3",
      fontSize: algoWidth / 53,
      alignSelf: "center",
      fontFamily: "Popins",
    },
    processButton: {
      height: algoWidth / 23,
      width: algoWidth / 23,
      alignContent: "center",
      justifyContent: "center",
      alignItems: "center",
      margin: algoWidth / 150,
      borderRadius: algoHeight / 20,
      marginTop: verticalScale(5),
    },

    sequenceBox: {
      height: algoWidth / 22,
      width: algoWidth / 22,
      alignContent: "center",
      justifyContent: "center",
      alignItems: "center",
      margin: algoWidth / 300,
      backgroundColor: "#CAE9FF",
    },
    normalText: {
      fontFamily: "Popins",
      fontSize: algoWidth / 53,
    },

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
    explanation: {
      fontFamily: "Popins",
      marginLeft: scale(5),
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
          <View
            style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
          >
            <Text>Content will be available soon!</Text>
          </View>
        </ScrollView>
      </View>
      <View style={{ flex: 6 }}>
        <ScrollView
          contentContainerStyle={{
            alignItems: "stretch",
            backgroundColor: background,
            paddingHorizontal: scale(5),
          }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              paddingVertical: verticalScale(5),
              flex: 1,
            }}
          >
            <View
              style={{
                marginBottom: scale(5),
                borderWidth: scale(1),
                borderRadius: scale(20),
                borderColor: main,
                paddingHorizontal: algoWidth / 53,
                alignContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    flex: 4,
                    justifyContent: "center",
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
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
                            alert("Sorry! Can't add more pages");
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
                            alert("Sorry! Can't add more pages");
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
                    </View>
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
                            addPage(3);
                            setRefresh(!refresh);
                          } else {
                            alert("Sorry! Can't add more pages");
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
                            alert("Sorry! Can't add more pages");
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
                    </View>
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
                            addPage(5);
                            setRefresh(!refresh);
                          } else {
                            alert("Sorry! Can't add more pages");
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
                  </View>
                </View>
                <View
                  style={{
                    flex: 5,
                    alignItems: "center",
                    alignSelf: "center",
                    justifyContent: "center",
                  }}
                >
                  {state.requestSequence.length > 0 ? (
                    <FlatList
                      data={state.requestSequence}
                      // horizontal
                      numColumns={5}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({ item, index }) => {
                        return (
                          <Animated.View
                            style={[
                              styles.sequenceBox,
                              state.showScheduled && index === curTime
                                ? {
                                    shadowColor: "#00000040", // IOS
                                    shadowOffset: {
                                      height: scale(1),
                                      width: scale(1),
                                    }, // IOS
                                    shadowOpacity: scale(1), // IOS
                                    shadowRadius: scale(5), //IOS
                                    elevation: 5,
                                  }
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
                    <Text
                      style={{
                        fontFamily: "Popins",
                        fontSize: algoWidth / 60,
                        color: primary,
                        alignSelf: "center",
                        padding: 2,
                      }}
                    >
                      *Click on above buttons to add the pages into the
                      sequence.
                    </Text>
                  )}
                </View>
                <View
                  style={{
                    flex: 4,
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      marginVertical: verticalScale(5),
                      alignItems: "center",
                      alignContent: "space-between",
                      justifyContent: "center",
                    }}
                  >
                    {state.requestSequence.length > 0 &&
                    state.showRun == false ? (
                      <View>
                        <View
                          style={{
                            flexDirection: "row",
                            marginBottom: algoHeight / 50,
                          }}
                        >
                          <TouchableOpacity
                            onPress={() => {
                              clear();
                              setRefresh(!refresh);
                            }}
                          >
                            <View style={styles.button}>
                              <Text style={styles.text}>Clear</Text>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              remove();
                              setRefresh(!refresh);
                            }}
                          >
                            <View style={styles.button}>
                              <Text style={styles.text}>Remove</Text>
                            </View>
                          </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                          onPress={() => {
                            if (state.requestSequence.length > 0) {
                              state.showRun = true;
                              setRefresh(!refresh);
                            } else {
                              alert("Please add the pages first!");
                            }
                          }}
                        >
                          <View style={styles.button}>
                            <Text style={styles.text}>Confirm</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    ) : state.showRun ? (
                      <View>
                        <View
                          style={{
                            marginBottom: algoHeight / 50,
                            flexDirection: "row",
                            justifyContent: "center",
                          }}
                        >
                          <TouchableOpacity
                            onPress={() => {
                              state.showRun = false;
                              state.showScheduled = false;
                              setRefresh(!refresh);
                            }}
                          >
                            <View style={styles.button}>
                              <Text style={styles.text}>Edit</Text>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              schedule(state.selectedAlgorithm);
                              setRefresh(!refresh);
                              setCurTime(0);
                            }}
                          >
                            <View style={styles.button}>
                              <Text style={styles.text}>Run</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "center",
                          }}
                        >
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
                      </View>
                    ) : null}
                  </View>
                </View>
              </View>
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
                  paddingVertical: verticalScale(5),
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
                      fontSize: algoWidth / 53,
                    }}
                  >
                    Time = {curTime}
                  </Text>
                  {state.hitMissArray[curTime] === -1 ? (
                    <Text style={styles.explanation}>
                      Page {state.requestSequence[curTime]} is Missed.
                    </Text>
                  ) : (
                    <Text style={styles.explanation}>
                      Page {state.requestSequence[curTime]} is Hit.
                    </Text>
                  )}
                  {state.replacedArray[curTime] != 0 ? (
                    <View style={{ marginTop: 3 }}>
                      <Text style={styles.explanation}>
                        Page {state.requestSequence[curTime]} is replaced with
                        the Page {state.replacedArray[curTime]} ,because we are
                        using {state.selectedAlgorithm} algorithm. And Page{" "}
                        {state.replacedArray[curTime]} came earliest in the RAM.
                      </Text>
                      {/* <Text style={styles.explanation}></Text> */}
                      {/* <Text style={styles.explanation}></Text> */}
                    </View>
                  ) : (
                    <View style={{ marginTop: 3 }}>
                      <Text style={styles.explanation}>
                        No need of replacement.
                      </Text>
                      <Text style={styles.explanation}> </Text>
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
                      width: algoWidth,
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
                    marginTop: verticalScale(5),
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
                    numColumns={10}
                    keyExtractor={(item, index) => `outer_${index}`} // Generate unique key for outer FlatList
                    renderItem={({ item, index }) => {
                      if (index <= curTime) {
                        return (
                          <View
                            style={{
                              marginBottom: verticalScale(5),
                              alignItems: "center",
                              marginRight: algoWidth / 53,
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
                                  marginTop: verticalScale(5),
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
                                  marginTop: verticalScale(5),
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
            ) : null}
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default PageReplacementAlgorithmsScreen;
