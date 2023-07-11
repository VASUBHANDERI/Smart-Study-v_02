import { View, Text } from "react-native";
import React from "react";
import { scale, verticalScale, moderateScale  } from "react-native-size-matters";
import useWindowSize from "../Hooks/useWindowSize";
export default function Spacer({ children }) {
  const [width, height] = useWindowSize();

  return <View style={{ margin: scale(20) }}>{children}</View>;
}
