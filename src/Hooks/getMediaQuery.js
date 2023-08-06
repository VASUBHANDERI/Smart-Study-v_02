import { useMediaQuery } from "react-responsive";
import { Dimensions } from "react-native";

export default function getMediaQuery() {
  const width = Dimensions.get("screen").width;

  const isMobileWidth = useMediaQuery({ maxWidth: 600 });
  const isTabletWidth = useMediaQuery({ minWidth: 600, maxWidth: 1224 });
  const isDesktopWidth = useMediaQuery({ minWidth: 1225 });
  const isWide = useMediaQuery({ minWidth: width * 0.6 });
  if (width < 500 && isWide) {
    isWide = false;
  }

  return [isMobileWidth, isTabletWidth, isDesktopWidth, isWide];
}
