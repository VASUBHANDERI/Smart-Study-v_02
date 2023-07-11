import { useState, useEffect } from "react";
import { Dimensions } from "react-native";

const getWindowSize = () => {
  const { width, height } = Dimensions.get("window");

  return [width, height];
};
export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(getWindowSize());
    };

    Dimensions.addEventListener("change", handleWindowResize);

    return () => {
      Dimensions.removeEventListener("change", handleWindowResize);
    };
  }, []);

  return windowSize;
}
