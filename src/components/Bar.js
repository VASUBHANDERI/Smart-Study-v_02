import { Dimensions, StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { processColor } from "./Colors";
import { Context as AlgoContext } from "../context/schedulingAlgoContext";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import useWindowSize from "../Hooks/useWindowSize";
import getMediaQuery from "../Hooks/getMediaQuery";
const Bar = ({ isScheduled, type}) => {
  const { state } = useContext(AlgoContext);
  const [width, height] = useWindowSize();

  const [isMobileWidth, isTabletWidth, isDesktopWidth, isWide] =
    getMediaQuery();
  const algoWidth = isWide ? width * 0.6 : width;
  const algoHeight = isWide ? height : height * 0.6;

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
                        ((algoWidth - scale(20)) / n) *
                        item.length,
                      height:algoWidth/30,
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
                            ((algoWidth - scale(20)) /
                              n) *
                            item.length,
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{ fontFamily: "Popins", fontSize:algoWidth/53 }}
                        >
                          0
                        </Text>
                        <Text
                          style={{ fontFamily: "Popins", fontSize:algoWidth/53 }}
                        >
                          {state.FCFStimeIndex[index]}
                        </Text>
                      </View>
                    </>
                  ) : (
                    <View
                      style={{
                        width:
                          ((algoWidth - scale(20)) /
                            n) *
                          item.length,
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{ fontFamily: "Popins", fontSize:algoWidth/53 }}
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
              height:algoWidth/30,
              backgroundColor: "white",
              width: algoWidth - scale(20),
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
                        ((algoWidth - scale(20)) / n) *
                        item.length,
                      height:algoWidth/30,
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
                            ((algoWidth - scale(20)) /
                              n) *
                            item.length,
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{ fontFamily: "Popins", fontSize:algoWidth/53 }}
                        >
                          0
                        </Text>
                        <Text
                          style={{ fontFamily: "Popins", fontSize:algoWidth/53 }}
                        >
                          {state.SJFtimeIndex[index]}
                        </Text>
                      </View>
                    </>
                  ) : (
                    <View
                      style={{
                        width:
                          ((algoWidth - scale(20)) /
                            n) *
                          item.length,
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{ fontFamily: "Popins", fontSize:algoWidth/53 }}
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
              height:algoWidth/30,
              backgroundColor: "white",
              width: algoWidth - scale(20),
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
                        ((algoWidth - scale(20)) / n) *
                        item.length,
                      height:algoWidth/30,
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
                            ((algoWidth - scale(20)) /
                              n) *
                            item.length,
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{ fontFamily: "Popins", fontSize:algoWidth/53 }}
                        >
                          0
                        </Text>
                        <Text
                          style={{ fontFamily: "Popins", fontSize:algoWidth/53 }}
                        >
                          {state.PRtimeIndex[index]}
                        </Text>
                      </View>
                    </>
                  ) : (
                    <View
                      style={{
                        width:
                          ((algoWidth - scale(20)) /
                            n) *
                          item.length,
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{ fontFamily: "Popins", fontSize:algoWidth/53 }}
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
              height:algoWidth/30,
              backgroundColor: "white",
              width: algoWidth - scale(20),
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
                        ((algoWidth - scale(20)) / n) *
                        item.length,
                      height:algoWidth/30,
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
                            ((algoWidth - scale(20)) /
                              n) *
                            item.length,
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{ fontFamily: "Popins", fontSize:algoWidth/53 }}
                        >
                          0
                        </Text>
                        <Text
                          style={{ fontFamily: "Popins", fontSize:algoWidth/53 }}
                        >
                          {state.SRTFtimeIndex[index]}
                        </Text>
                      </View>
                    </>
                  ) : (
                    <View
                      style={{
                        width:
                          ((algoWidth - scale(20)) /
                            n) *
                          item.length,
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{ fontFamily: "Popins", fontSize:algoWidth/53 }}
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
              height:algoWidth/30,
              backgroundColor: "white",
              width: algoWidth - scale(20),
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
                        ((algoWidth - scale(20)) / n) *
                        item.length,
                      height:algoWidth/30,
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
                            ((algoWidth - scale(20)) /
                              n) *
                            item.length,
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{ fontFamily: "Popins", fontSize:algoWidth/53 }}
                        >
                          0
                        </Text>
                        <Text
                          style={{ fontFamily: "Popins", fontSize:algoWidth/53 }}
                        >
                          {state.PrePRtimeIndex[index]}
                        </Text>
                      </View>
                    </>
                  ) : (
                    <View
                      style={{
                        width:
                          ((algoWidth - scale(20)) /
                            n) *
                          item.length,
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{ fontFamily: "Popins", fontSize:algoWidth/53 }}
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
              height:algoWidth/30,
              backgroundColor: "white",
              width: algoWidth - scale(20),
            }}
          />
        )}
      </View>
    );
  }
};

export default Bar;

const styles = StyleSheet.create({});
