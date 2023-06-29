import { View, Text } from "react-native";
import React from "react";
import { scale, verticalScale, moderateScale  } from "react-native-size-matters";
export default function Spacer({ children }) {
  return <View style={{ margin: scale(20) }}>{children}</View>;
}
