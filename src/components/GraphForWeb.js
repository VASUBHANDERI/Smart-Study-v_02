import Svg, {
  Line,
  Circle,
  Defs,
  Marker,
  Path,
  Text as SvgText,
} from "react-native-svg";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { useContext } from "react";
import { Context as DiskContext } from "../context/diskManagementAlgoContext";
import { scale, verticalScale } from "react-native-size-matters";
import React from "react";
import useWindowSize from "../Hooks/useWindowSize";
import getMediaQuery from "../Hooks/getMediaQuery";

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const GraphForWeb = () => {
  const [width, height] = useWindowSize();

  const { state } = useContext(DiskContext);
  const [isMobileWidth, isTabletWidth, isDesktopWidth, isWide] =
    getMediaQuery();
  const algoWidth = isWide ? width * 0.6 : width;
  const algoHeight = isWide ? height : height * 0.6;

  // Calculate the height of the graph container based on the maximum value
  const graphHeight = state.totalTracks * 10; // Adjust this value as needed

  // Calculate the x-coordinate spacing between points
  const ySpacing = algoHeight/20;

  return (
    <AnimatedSvg
      entering={FadeIn}
      width={algoWidth} // Adjust the width of the graph container as needed
      height={algoHeight}
    >
      {/* Y-axis */}
      {/* <Line
          x1={scale(40)} // Adjust the starting position of the Y-axis as needed
          y1={10}
          x2={scale(40)} // Adjust the ending position of the Y-axis as needed
          y2={graphHeight}
          stroke="black" // Adjust the color of the Y-axis as needed
          strokeWidth={1}
        /> */}
      {/* X-axis */}
      <Line
        x1={algoWidth / 50} // Adjust the ending position of the X-axis as needed
        y1={algoHeight / 20}
        x2={algoWidth - algoWidth / 50} // Adjust the starting position of the X-axis as needed
        y2={algoHeight / 20}
        stroke="black" // Adjust the color of the X-axis as needed
        strokeWidth={1}
      />
      {/* Bars on Y-axis */}
      {state.YAxisCoordinates.map((value, index) => (
        <React.Fragment key={index}>
          {value != 0 && value != state.totalTracks ? (
            <>
              <Circle
                cx={
                  algoWidth / 50 +
                  value * ((algoWidth - algoWidth / 25) / state.totalTracks)
                }
                cy={algoHeight / 20}
                r={algoWidth / 300} // Adjust the radius of the circle as needed
                fill={value != state.currentPosition ? "blue" : "red"} // Adjust the color of the circle as needed
              ></Circle>

              <Circle
                cx={algoWidth / 50}
                cy={algoHeight / 20}
                r={algoWidth / 300} // Adjust the radius of the circle as needed
                fill={"red"} // Adjust the color of the circle as needed
              ></Circle>

              <Circle
                cx={
                  algoWidth / 50 +
                  state.totalTracks *
                    ((algoWidth - algoWidth / 25) / state.totalTracks)
                }
                cy={algoHeight / 20}
                r={algoWidth / 300} // Adjust the radius of the circle as needed
                fill={  "red"} // Adjust the color of the circle as needed
              ></Circle>
              <SvgText
                x={
                  algoWidth / 70 +
                  value * ((algoWidth - algoWidth / 25) / state.totalTracks)
                } // Adjust the position of the text on the Y-axis as needed
                y={algoHeight / 20 - algoHeight / 80}
                fill={value != state.currentPosition ? "black" : "blue"} // Adjust the color of the text as needed
                fontSize={algoWidth / 90} // Adjust the font size of the text as needed
                fontWeight="bold"
                textAnchor="center"
              >
                {value}
              </SvgText>

              <SvgText
                x={
                  algoWidth / 70 +
                  state.totalTracks *
                    ((algoWidth - algoWidth / 25) / state.totalTracks)
                } // Adjust the position of the text on the Y-axis as needed
                y={algoHeight / 20 - algoHeight / 80}
                fill={"red"} // Adjust the color of the text as needed
                fontSize={algoWidth / 60} // Adjust the font size of the text as needed
                fontWeight="bold"
                textAnchor="center"
              >
                {state.totalTracks}
              </SvgText>

              <SvgText
                x={algoWidth / 50} // Adjust the position of the text on the Y-axis as needed
                y={algoHeight / 20 - algoHeight / 80}
                fill={"red"} // Adjust the color of the text as needed
                fontSize={algoWidth / 60} // Adjust the font size of the text as needed
                fontWeight="bold"
                textAnchor="middle"
              >
                0
              </SvgText>
            </>
          ) : null}
          {/* {state.selectedAlgorithm != "FCFS" &&
          state.selectedAlgorithm != "SSTF" ? (
            <>
              <Line
                x1={
                  algoWidth / 50 +
                  state.currentPosition *
                    ((algoWidth - algoWidth / 25) / state.totalTracks)
                } // Adjust the position of the bar on the Y-axis as needed
                y1={algoHeight / 20}
                x2={
                  state.DirectionOfHead == 1
                    ? algoWidth / 50 +
                      state.currentPosition *
                        ((algoWidth - algoWidth / 25) / state.totalTracks) +
                      algoWidth / 80
                    : algoWidth / 50 +
                      state.currentPosition *
                        ((algoWidth - algoWidth / 25) / state.totalTracks) -
                      algoWidth / 80
                } // Adjust the position of the bar on the Y-axis as needed
                y2={algoHeight / 20}
                stroke="red" // Adjust the color of the bars as needed
                strokeWidth={1.5} // Adjust the width of the bars as needed
              />
              <Line
                x1={
                  state.DirectionOfHead == 1
                    ? algoWidth / 50 +
                      state.currentPosition *
                        ((algoWidth - algoWidth / 25) / state.totalTracks) +
                      algoWidth / 80
                    : algoWidth / 50 +
                      state.currentPosition *
                        ((algoWidth - algoWidth / 25) / state.totalTracks) -
                      algoWidth / 80
                } // Adjust the position of the bar on the Y-axis as needed
                y1={algoHeight / 20}
                x2={
                  state.DirectionOfHead == 1
                    ? algoWidth / 50 +
                      state.currentPosition *
                        ((algoWidth - algoWidth / 25) / state.totalTracks) +
                      algoWidth / 80 -
                      algoWidth / 200
                    : algoWidth / 50 +
                      state.currentPosition *
                        ((algoWidth - algoWidth / 25) / state.totalTracks) -
                      algoWidth / 80 +
                      algoWidth / 200
                } // Adjust the position of the bar on the Y-axis as needed
                y2={algoHeight / 20 + algoHeight / 100}
                stroke="red" // Adjust the color of the bars as needed
                strokeWidth={1.5} // Adjust the width of the bars as needed
              />
              <Line
                x1={
                  state.DirectionOfHead == 1
                    ? algoWidth / 50 +
                      state.currentPosition *
                        ((algoWidth - algoWidth / 25) / state.totalTracks) +
                      algoWidth / 80
                    : algoWidth / 50 +
                      state.currentPosition *
                        ((algoWidth - algoWidth / 25) / state.totalTracks) -
                      algoWidth / 80
                } // Adjust the position of the bar on the Y-axis as needed
                y1={algoHeight / 20}
                x2={
                  state.DirectionOfHead == 1
                    ? algoWidth / 50 +
                      state.currentPosition *
                        ((algoWidth - algoWidth / 25) / state.totalTracks) +
                      algoWidth / 80 -
                      algoWidth / 200
                    : algoWidth / 50 +
                      state.currentPosition *
                        ((algoWidth - algoWidth / 25) / state.totalTracks) -
                      algoWidth / 80 +
                      algoWidth / 200
                } // Adjust the position of the bar on the Y-axis as needed
                y2={algoHeight / 20 - algoHeight / 100}
                stroke="red" // Adjust the color of the bars as needed
                strokeWidth={1.5} // Adjust the width of the bars as needed
              />
            </>
          ) : null} */}
          
        </React.Fragment>
      ))}

      {/* Lines between points */}
      {state.scheduleSequence.map((value, index) => {
        if (index < state.scheduleSequence.length - 1) {
          const y1 = algoHeight/20 + index * ySpacing;
          const x1 = algoWidth/50 +  state.scheduleSequence[index] *((algoWidth - algoWidth / 25) / state.totalTracks);
          const y2 = algoHeight/20 + (index + 1) * ySpacing;
          const x2 = algoWidth/50 + state.scheduleSequence[index + 1] * ((algoWidth - algoWidth / 25) / state.totalTracks);
          const x3 = algoWidth/50;
          const nextValue = state.scheduleSequence[index + 1];
          const XEnd = nextValue === 0 ? x3 : x2;
          return (
            <React.Fragment key={index}>
              {/* Dotted line */}
              <Line
                x1={x2}
                y1={algoHeight/20}
                x2={x2}
                y2={y2}
                stroke="#00000050" // Adjust the color of the dotted line as needed
                strokeWidth={1}
                strokeDasharray="2,2" // Adjust the length of the dots and gaps as needed
              />
              <Line
                key={index}
                x1={x1}
                y1={y1}
                x2={XEnd}
                y2={y2}
                stroke="green" // Adjust the color of the lines as needed
                strokeWidth={1} // Adjust the width of the lines as needed
              />
              <Circle
                cx={XEnd}
                cy={y2}
                r={algoWidth/300} // Adjust the radius of the circle as needed
                fill={
                  index < state.YAxisCoordinates.length - 2 ? "green" : "red"
                } // Adjust the color of the circle as needed
              ></Circle>
              <SvgText
                x={XEnd}
                y={y2 + algoHeight/50}
                textAnchor="middle"
                alignmentBaseline="middle"
                fontSize={algoWidth/80}
                fill="black" // Adjust the color of the text as needed
              >
                {index + 1}
              </SvgText>
            </React.Fragment>
          );
        } else {
          return null;
        }
      })}
    </AnimatedSvg>
  );
};

export default GraphForWeb;
