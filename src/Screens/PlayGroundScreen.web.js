import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Terminal from "../components/Terminal.android";
Text.defaultProps = {
  ...(Text.defaultProps || {}),
  allowFontScaling: false,
};

const PlayGroundScreen = () => {
  return <Terminal />;
};

export default PlayGroundScreen;
