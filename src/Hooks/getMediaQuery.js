import { useMediaQuery } from "react-responsive";
import { Dimensions } from "react-native";

export default function getMediaQuery() {
  const width = Dimensions.get("screen").width;

  const isMobileWidth = useMediaQuery({ maxWidth: 600 });
  const isTabletWidth = useMediaQuery({ minWidth: 600, maxWidth: 1224 });
  const isDesktopWidth = useMediaQuery({ minWidth: 1225 });
  let isWide = useMediaQuery({ minWidth: width * 0.6 });
  let details = navigator.userAgent;

  /* Creating a regular expression 
containing some mobile devices keywords 
to search it in details string*/
  let regexp = /android|iphone|kindle|ipad/i;

  /* Using test() method to search regexp in details
it returns boolean value*/
  let isMobileDevice = regexp.test(details);

  if (isMobileDevice) {
    isWide = false;
  }

  return [isMobileWidth, isTabletWidth, isDesktopWidth, isWide];
}
