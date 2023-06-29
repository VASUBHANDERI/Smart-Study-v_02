import { StyleSheet, Text, View, FlatList, Button } from "react-native";
import React, { useState, useContext } from "react";
import { Context as AlgoContext } from "../context/schedulingAlgoContext";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
const Steps = () => {
  const { state } = useContext(AlgoContext);
  const [curTime, setCurTime] = useState(0);
  //   let n = state.waitingTimeLine[curTime].length;
  console.log(state.waitingTimeLine[curTime]);

  return (
    <View>
      <View>
        <Text>At t = {curTime}</Text>
        {state.timeLine[curTime] == -1 ? (
          <Text>No Process is in the execution now</Text>
        ) : (
          <Text>P{state.timeLine[curTime]} is in the execution now</Text>
        )}

        <FlatList
          data={state.waitingTimeLine[curTime]}
          renderItem={({ item }) => {
            return <Text>P{item} is waiting now</Text>;
          }}
        />

        {/* {state.waitingTimeLine[curTime].length == 0 ? (
          <Text>No Process is waiting now</Text>
        ) : (
          <FlatList
            data={state.waitingTimeLine[curTime]}
            renderItem={({ item }) => {
              return <Text>P{item} is waiting now</Text>;
            }}
          />
        )} */}
      </View>
      <View style={{ flexDirection: "row" }}>
        <Button
          title="Back"
          onPress={curTime > 0 ? setCurTime(curTime - 1) : null}
        />
        <Button
          title="Next"
          onPress={
            curTime < state.waitingTimeLine.length
              ? setCurTime(curTime + 1)
              : null
          }
        />
      </View>
    </View>
  );
};

export default Steps;

const styles = StyleSheet.create({});
