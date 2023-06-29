import { Dimensions, StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { processColor } from "./Colors";
import { Context as AlgoContext } from "../context/schedulingAlgoContext";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
const Bar = ({ isScheduled, type }) => {
  const { state } = useContext(AlgoContext);
  if (type == "FCFS") {
    const n = state.FCFStimeLine.length;
    return (
      <View
        style={{ marginVertical: verticalScale(5), marginHorizontal: scale(5) }}
      >
        {isScheduled ? (
          <FlatList
            data={state.FCFSgroupedTimeLine}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              const backgroundColor =
                item[0] === -1 ? "#ffffff" : processColor[item[0]];

              return (
                <View>
                  <View
                    style={{
                      backgroundColor: backgroundColor,
                      width:
                        ((Dimensions.get("screen").width - scale(20)) / n) *
                        item.length,
                      height: verticalScale(40),
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  ></View>
                  {index == 0 ? (
                    <>
                      <View
                        style={{
                          width:
                            ((Dimensions.get("screen").width - scale(20)) / n) *
                            item.length,
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{ fontFamily: "Popins", fontSize: scale(10) }}
                        >
                          0
                        </Text>
                        <Text
                          style={{ fontFamily: "Popins", fontSize: scale(10) }}
                        >
                          {state.FCFStimeIndex[index]}
                        </Text>
                      </View>
                    </>
                  ) : (
                    <View
                      style={{
                        width:
                          ((Dimensions.get("screen").width - scale(20)) / n) *
                          item.length,
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{ fontFamily: "Popins", fontSize: scale(10) }}
                      >
                        {state.FCFStimeIndex[index]}
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
              height: verticalScale(40),
              backgroundColor: "white",
              width: Dimensions.get("screen").width - scale(20),
            }}
          />
        )}
      </View>
    );
  } else if (type == "SJF") {
    const n = state.SJFtimeLine.length;
    return (
      <View
        style={{ marginVertical: verticalScale(5), marginHorizontal: scale(5) }}
      >
        {isScheduled ? (
          <FlatList
            data={state.SJFgroupedTimeLine}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              const backgroundColor =
                item[0] === -1 ? "#ffffff" : processColor[item[0]];

              return (
                <View>
                  <View
                    style={{
                      backgroundColor: backgroundColor,
                      width:
                        ((Dimensions.get("screen").width - scale(20)) / n) *
                        item.length,
                      height: verticalScale(40),
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  ></View>
                  {index == 0 ? (
                    <>
                      <View
                        style={{
                          width:
                            ((Dimensions.get("screen").width - scale(20)) / n) *
                            item.length,
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{ fontFamily: "Popins", fontSize: scale(10) }}
                        >
                          0
                        </Text>
                        <Text
                          style={{ fontFamily: "Popins", fontSize: scale(10) }}
                        >
                          {state.SJFtimeIndex[index]}
                        </Text>
                      </View>
                    </>
                  ) : (
                    <View
                      style={{
                        width:
                          ((Dimensions.get("screen").width - scale(20)) / n) *
                          item.length,
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{ fontFamily: "Popins", fontSize: scale(10) }}
                      >
                        {state.SJFtimeIndex[index]}
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
              height: verticalScale(40),
              backgroundColor: "white",
              width: Dimensions.get("screen").width - scale(20),
            }}
          />
        )}
      </View>
    );
  } else if (type == "PR") {
    const n = state.PRtimeLine.length;
    return (
      <View
        style={{ marginVertical: verticalScale(5), marginHorizontal: scale(5) }}
      >
        {isScheduled ? (
          <FlatList
            data={state.PRgroupedTimeLine}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              const backgroundColor =
                item[0] === -1 ? "#ffffff" : processColor[item[0]];

              return (
                <View>
                  <View
                    style={{
                      backgroundColor: backgroundColor,
                      width:
                        ((Dimensions.get("screen").width - scale(20)) / n) *
                        item.length,
                      height: verticalScale(40),
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  ></View>
                  {index == 0 ? (
                    <>
                      <View
                        style={{
                          width:
                            ((Dimensions.get("screen").width - scale(20)) / n) *
                            item.length,
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{ fontFamily: "Popins", fontSize: scale(10) }}
                        >
                          0
                        </Text>
                        <Text
                          style={{ fontFamily: "Popins", fontSize: scale(10) }}
                        >
                          {state.PRtimeIndex[index]}
                        </Text>
                      </View>
                    </>
                  ) : (
                    <View
                      style={{
                        width:
                          ((Dimensions.get("screen").width - scale(20)) / n) *
                          item.length,
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{ fontFamily: "Popins", fontSize: scale(10) }}
                      >
                        {state.PRtimeIndex[index]}
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
              height: verticalScale(40),
              backgroundColor: "white",
              width: Dimensions.get("screen").width - scale(20),
            }}
          />
        )}
      </View>
    );
  } else if (type == "SRTF") {
    const n = state.SRTFtimeLine.length;
    return (
      <View
        style={{ marginVertical: verticalScale(5), marginHorizontal: scale(5) }}
      >
        {isScheduled ? (
          <FlatList
            data={state.SRTFgroupedTimeLine}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              const backgroundColor =
                item[0] === -1 ? "#ffffff" : processColor[item[0]];

              return (
                <View>
                  <View
                    style={{
                      backgroundColor: backgroundColor,
                      width:
                        ((Dimensions.get("screen").width - scale(20)) / n) *
                        item.length,
                      height: verticalScale(40),
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  ></View>
                  {index == 0 ? (
                    <>
                      <View
                        style={{
                          width:
                            ((Dimensions.get("screen").width - scale(20)) / n) *
                            item.length,
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{ fontFamily: "Popins", fontSize: scale(10) }}
                        >
                          0
                        </Text>
                        <Text
                          style={{ fontFamily: "Popins", fontSize: scale(10) }}
                        >
                          {state.SRTFtimeIndex[index]}
                        </Text>
                      </View>
                    </>
                  ) : (
                    <View
                      style={{
                        width:
                          ((Dimensions.get("screen").width - scale(20)) / n) *
                          item.length,
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{ fontFamily: "Popins", fontSize: scale(10) }}
                      >
                        {state.SRTFtimeIndex[index]}
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
              height: verticalScale(40),
              backgroundColor: "white",
              width: Dimensions.get("screen").width - scale(20),
            }}
          />
        )}
      </View>
    );
  } else if (type == "PrePR") {
    const n = state.PrePRtimeLine.length;
    return (
      <View
        style={{ marginVertical: verticalScale(5), marginHorizontal: scale(5) }}
      >
        {isScheduled ? (
          <FlatList
            data={state.PrePRgroupedTimeLine}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              const backgroundColor =
                item[0] === -1 ? "#ffffff" : processColor[item[0]];

              return (
                <View>
                  <View
                    style={{
                      backgroundColor: backgroundColor,
                      width:
                        ((Dimensions.get("screen").width - scale(20)) / n) *
                        item.length,
                      height: verticalScale(40),
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  ></View>
                  {index == 0 ? (
                    <>
                      <View
                        style={{
                          width:
                            ((Dimensions.get("screen").width - scale(20)) / n) *
                            item.length,
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{ fontFamily: "Popins", fontSize: scale(10) }}
                        >
                          0
                        </Text>
                        <Text
                          style={{ fontFamily: "Popins", fontSize: scale(10) }}
                        >
                          {state.PrePRtimeIndex[index]}
                        </Text>
                      </View>
                    </>
                  ) : (
                    <View
                      style={{
                        width:
                          ((Dimensions.get("screen").width - scale(20)) / n) *
                          item.length,
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{ fontFamily: "Popins", fontSize: scale(10) }}
                      >
                        {state.PrePRtimeIndex[index]}
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
              height: verticalScale(40),
              backgroundColor: "white",
              width: Dimensions.get("screen").width - scale(20),
            }}
          />
        )}
      </View>
    );
  }
};

export default Bar;

const styles = StyleSheet.create({});
