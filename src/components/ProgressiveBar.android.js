import { Dimensions, StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { processColor } from "./Colors";
import { Context as AlgoContext } from "../context/schedulingAlgoContext";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import useWindowSize from "../Hooks/useWindowSize";
import getMediaQuery from "../Hooks/getMediaQuery";
const ProgressiveBar = ({ isScheduled, curTime, type }) => {
  const [width, height] = useWindowSize();

  const [isMobileWidth, isTabletWidth, isDesktopWidth, isWide] =
    getMediaQuery();
  const algoWidth = isWide ? width * 0.6 : width;
  const algoHeight = isWide ? height : height * 0.6;

  const { state } = useContext(AlgoContext);
  if (type == "FCFS") {
    const n = state.FCFStimeLine.length;
    return (
      <View style={{ alignSelf: "center", height: algoWidth / 6 }}>
        {isScheduled ? (
          <FlatList
            data={state.FCFStimeLine}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              if (index <= curTime) {
                var backgroundColor =
                  item === -1 ? "#ffffff" : processColor[item];
              } else {
                var backgroundColor = "grey";
              }

              return (
                <View>
                  <View
                    style={{
                      backgroundColor: backgroundColor,
                      width: (algoWidth * 0.9) / n,
                      height: algoWidth / 10,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  ></View>
                  {index == 0 ? (
                    <>
                      <View
                        style={{
                          width: (algoWidth * 0.9) / n,
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "Popins",
                            fontSize: algoWidth / 53,
                          }}
                        >
                          0
                        </Text>
                        <Text
                          style={{
                            fontFamily: "Popins",
                            fontSize: algoWidth / 53,
                          }}
                        >
                          1
                        </Text>
                      </View>
                    </>
                  ) : (
                    <View
                      style={{
                        width: (algoWidth * 0.9) / n,
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Popins",
                          fontSize: algoWidth / 53,
                        }}
                      >
                        {index + 1}
                      </Text>
                    </View>
                  )}
                </View>
              );
            }}
            keyExtractor={(index) => index.toString()}
          />
        ) : (
          <View
            style={{
              height: algoWidth / 10,
              backgroundColor: "white",
              width: algoWidth * 0.9,
            }}
          />
        )}
      </View>
    );
  } else if (type === "SJF") {
    const n = state.SJFtimeLine.length;
    return (
      <View style={{ alignSelf: "center", height: algoWidth / 6 }}>
        {isScheduled ? (
          <FlatList
            data={state.SJFtimeLine}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              if (index <= curTime) {
                var backgroundColor =
                  item === -1 ? "#ffffff" : processColor[item];
              } else {
                var backgroundColor = "grey";
              }

              return (
                <View>
                  <View
                    style={{
                      backgroundColor: backgroundColor,
                      width: (algoWidth * 0.9) / n,
                      height: algoWidth / 10,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  ></View>
                  {index == 0 ? (
                    <>
                      <View
                        style={{
                          width: (algoWidth * 0.9) / n,
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "Popins",
                            fontSize: algoWidth / 53,
                          }}
                        >
                          0
                        </Text>
                        <Text
                          style={{
                            fontFamily: "Popins",
                            fontSize: algoWidth / 53,
                          }}
                        >
                          1
                        </Text>
                      </View>
                    </>
                  ) : (
                    <View
                      style={{
                        width: (algoWidth * 0.9) / n,
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Popins",
                          fontSize: algoWidth / 53,
                        }}
                      >
                        {index + 1}
                      </Text>
                    </View>
                  )}
                </View>
              );
            }}
            keyExtractor={(index) => index.toString()}
          />
        ) : (
          <View
            style={{
              height: algoWidth / 10,
              backgroundColor: "white",
              width: algoWidth * 0.9,
            }}
          />
        )}
      </View>
    );
  } else if (type === "PR") {
    const n = state.PRtimeLine.length;
    return (
      <View style={{ alignSelf: "center", height: algoWidth / 6 }}>
        {isScheduled ? (
          <FlatList
            data={state.PRtimeLine}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              if (index <= curTime) {
                var backgroundColor =
                  item === -1 ? "#ffffff" : processColor[item];
              } else {
                var backgroundColor = "grey";
              }

              return (
                <View>
                  <View
                    style={{
                      backgroundColor: backgroundColor,
                      width: (algoWidth * 0.9) / n,
                      height: algoWidth / 10,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  ></View>
                  {index == 0 ? (
                    <>
                      <View
                        style={{
                          width: (algoWidth * 0.9) / n,
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "Popins",
                            fontSize: algoWidth / 53,
                          }}
                        >
                          0
                        </Text>
                        <Text
                          style={{
                            fontFamily: "Popins",
                            fontSize: algoWidth / 53,
                          }}
                        >
                          1
                        </Text>
                      </View>
                    </>
                  ) : (
                    <View
                      style={{
                        width: (algoWidth * 0.9) / n,
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Popins",
                          fontSize: algoWidth / 53,
                        }}
                      >
                        {index + 1}
                      </Text>
                    </View>
                  )}
                </View>
              );
            }}
            keyExtractor={(index) => index.toString()}
          />
        ) : (
          <View
            style={{
              height: algoWidth / 10,
              backgroundColor: "white",
              width: algoWidth * 0.9,
            }}
          />
        )}
      </View>
    );
  } else if (type === "SRTF") {
    const n = state.SRTFtimeLine.length;
    return (
      <View style={{ alignSelf: "center", height: algoWidth / 6 }}>
        {isScheduled ? (
          <FlatList
            data={state.SRTFtimeLine}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              if (index <= curTime) {
                var backgroundColor =
                  item === -1 ? "#ffffff" : processColor[item];
              } else {
                var backgroundColor = "grey";
              }

              return (
                <View>
                  <View
                    style={{
                      backgroundColor: backgroundColor,
                      width: (algoWidth * 0.9) / n,
                      height: algoWidth / 10,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  ></View>
                  {index == 0 ? (
                    <>
                      <View
                        style={{
                          width: (algoWidth * 0.9) / n,
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "Popins",
                            fontSize: algoWidth / 53,
                          }}
                        >
                          0
                        </Text>
                        <Text
                          style={{
                            fontFamily: "Popins",
                            fontSize: algoWidth / 53,
                          }}
                        >
                          1
                        </Text>
                      </View>
                    </>
                  ) : (
                    <View
                      style={{
                        width: (algoWidth * 0.9) / n,
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Popins",
                          fontSize: algoWidth / 53,
                        }}
                      >
                        {index + 1}
                      </Text>
                    </View>
                  )}
                </View>
              );
            }}
            keyExtractor={(index) => index.toString()}
          />
        ) : (
          <View
            style={{
              height: algoWidth / 10,
              backgroundColor: "white",
              width: algoWidth * 0.9,
            }}
          />
        )}
      </View>
    );
  } else if (type === "PrePR") {
    const n = state.PrePRtimeLine.length;
    return (
      <View style={{ alignSelf: "center", height: algoWidth / 6 }}>
        {isScheduled ? (
          <FlatList
            data={state.PrePRtimeLine}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              if (index <= curTime) {
                var backgroundColor =
                  item === -1 ? "#ffffff" : processColor[item];
              } else {
                var backgroundColor = "grey";
              }

              return (
                <View>
                  <View
                    style={{
                      backgroundColor: backgroundColor,
                      width: (algoWidth * 0.9) / n,
                      height: algoWidth / 10,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  ></View>
                  {index == 0 ? (
                    <>
                      <View
                        style={{
                          width: (algoWidth * 0.9) / n,
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "Popins",
                            fontSize: algoWidth / 53,
                          }}
                        >
                          0
                        </Text>
                        <Text
                          style={{
                            fontFamily: "Popins",
                            fontSize: algoWidth / 53,
                          }}
                        >
                          1
                        </Text>
                      </View>
                    </>
                  ) : (
                    <View
                      style={{
                        width: (algoWidth * 0.9) / n,
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Popins",
                          fontSize: algoWidth / 53,
                        }}
                      >
                        {index + 1}
                      </Text>
                    </View>
                  )}
                </View>
              );
            }}
            keyExtractor={(index) => index.toString()}
          />
        ) : (
          <View
            style={{
              height: algoWidth / 10,
              backgroundColor: "white",
              width: algoWidth * 0.9,
            }}
          />
        )}
      </View>
    );
  }
};

export default ProgressiveBar;

const styles = StyleSheet.create({});
