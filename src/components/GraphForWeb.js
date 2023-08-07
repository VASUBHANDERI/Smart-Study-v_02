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
    const graphHeight = state.totalTracks * 10 ; // Adjust this value as needed
  
    // Calculate the x-coordinate spacing between points
    const xSpacing = scale(280) / state.YAxisCoordinates.length;
  
    return (
      <AnimatedSvg
        entering={FadeIn}
        width={scale(360)} // Adjust the width of the graph container as needed
        height={graphHeight + scale(20)}
      >
        {/* Y-axis */}
        <Line
          x1={scale(40)} // Adjust the starting position of the Y-axis as needed
          y1={10}
          x2={scale(40)} // Adjust the ending position of the Y-axis as needed
          y2={graphHeight}
          stroke="black" // Adjust the color of the Y-axis as needed
          strokeWidth={1}
        />
        {/* X-axis */}
        <Line
          x1={scale(320)} // Adjust the ending position of the X-axis as needed
          y1={graphHeight}
          x2={scale(40)} // Adjust the starting position of the X-axis as needed
          y2={graphHeight}
          stroke="black" // Adjust the color of the X-axis as needed
          strokeWidth={1}
        />
        {/* Bars on Y-axis */}
        {state.YAxisCoordinates.map((value, index) => (
          <React.Fragment key={index}>
            {value != 0 && value != state.totalTracks ? (
              <>
                <Line
                  x1={scale(40)} // Adjust the position of the bar on the Y-axis as needed
                  y1={graphHeight - value * 10 + 10}
                  x2={scale(50)} // Adjust the position of the bar on the Y-axis as needed
                  y2={graphHeight - value * 10 + 10}
                  stroke="blue" // Adjust the color of the bars as needed
                  strokeWidth={1} // Adjust the width of the bars as needed
                />
                <SvgText
                  x={scale(35)} // Adjust the position of the text on the Y-axis as needed
                  y={graphHeight - value * 10 + scale(11)}
                  fill="black" // Adjust the color of the text as needed
                  fontSize={scale(8)} // Adjust the font size of the text as needed
                  fontWeight="bold"
                  textAnchor="end"
                >
                  {value}
                </SvgText>
              </>
            ) : null}
            {state.selectedAlgorithm != "FCFS" && state.selectedAlgorithm != "SSTF" ? (
              <>
                <Line
                  x1={scale(40)} // Adjust the position of the bar on the Y-axis as needed
                  y1={graphHeight - state.currentPosition * 10 + 10}
                  x2={scale(40)} // Adjust the position of the bar on the Y-axis as needed
                  y2={
                    state.DirectionOfHead == 1
                      ? graphHeight - state.currentPosition * 10 - scale(5)
                      : graphHeight - state.currentPosition * 10 + scale(20)
                  }
                  stroke="red" // Adjust the color of the bars as needed
                  strokeWidth={2} // Adjust the width of the bars as needed
                />
                <Line
                  x1={scale(35)} // Adjust the position of the bar on the Y-axis as needed
                  y1={
                    state.DirectionOfHead == 1
                      ? graphHeight - state.currentPosition * 10
                      : graphHeight - state.currentPosition * 10 + scale(15)
                  }
                  x2={scale(40)} // Adjust the position of the bar on the Y-axis as needed
                  y2={
                    state.DirectionOfHead == 1
                      ? graphHeight - state.currentPosition * 10 - scale(5)
                      : graphHeight - state.currentPosition * 10 + scale(20)
                  }
                  stroke="red" // Adjust the color of the bars as needed
                  strokeWidth={2} // Adjust the width of the bars as needed
                />
                <Line
                  x1={scale(45)} // Adjust the position of the bar on the Y-axis as needed
                  y1={
                    state.DirectionOfHead == 1
                      ? graphHeight - state.currentPosition * 10
                      : graphHeight - state.currentPosition * 10 + scale(15)
                  }
                  x2={scale(40)} // Adjust the position of the bar on the Y-axis as needed
                  y2={
                    state.DirectionOfHead == 1
                      ? graphHeight - state.currentPosition * 10 - scale(5)
                      : graphHeight - state.currentPosition * 10 + scale(20)
                  }
                  stroke="red" // Adjust the color of the bars as needed
                  strokeWidth={2} // Adjust the width of the bars as needed
                />
              </>
            ) : null}
  
            <SvgText
              x={scale(35)} // Adjust the position of the text on the Y-axis as needed
              y={graphHeight - state.currentPosition * 10 + scale(11)}
              fill="blue" // Adjust the color of the text as needed
              fontSize={scale(8)} // Adjust the font size of the text as needed
              fontWeight="bold"
              textAnchor="end"
            >
              {state.currentPosition}
            </SvgText>
  
            <Line
              x1={scale(35)} // Adjust the position of the bar on the Y-axis as needed
              y1={10}
              x2={scale(45)} // Adjust the position of the bar on the Y-axis as needed
              y2={10}
              stroke="blue" // Adjust the color of the bars as needed
              strokeWidth={1} // Adjust the width of the bars as needed
            />
            <SvgText
              x={scale(35)} // Adjust the position of the text on the Y-axis as needed
              y={14}
              fill="blue" // Adjust the color of the text as needed
              fontSize={scale(10)} // Adjust the font size of the text as needed
              fontWeight="bold"
              textAnchor="end"
            >
              {state.totalTracks}
            </SvgText>
            <SvgText
              x={scale(35)} // Adjust the position of the text on the Y-axis as needed
              y={graphHeight}
              fill="blue" // Adjust the color of the text as needed
              fontSize={scale(10)} // Adjust the font size of the text as needed
              fontWeight="bold"
              textAnchor="end"
            >
              0
            </SvgText>
          </React.Fragment>
        ))}
  
        {/* Lines between points */}
        {state.scheduleSequence.map((value, index) => {
          if (index < state.scheduleSequence.length - 1) {
            const x1 = scale(40) + index * xSpacing;
            const y1 = graphHeight - state.scheduleSequence[index] * 10 + 10;
            const x2 = scale(40) + (index + 1) * xSpacing;
            const y2 = graphHeight - state.scheduleSequence[index + 1] * 10 + 10;
            const y3 = graphHeight;
            const nextValue = state.scheduleSequence[index + 1];
            const YEnd = nextValue === 0 ? y3 : y2;
            return (
              <React.Fragment key={index}>
                {/* Dotted line */}
                <Line
                  x1={x2}
                  y1={YEnd}
                  x2={scale(40)}
                  y2={YEnd}
                  stroke="#00000050" // Adjust the color of the dotted line as needed
                  strokeWidth={1}
                  strokeDasharray="2,2" // Adjust the length of the dots and gaps as needed
                />
                <Line
                  key={index}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={YEnd}
                  stroke="green" // Adjust the color of the lines as needed
                  strokeWidth={1} // Adjust the width of the lines as needed
                />
                <Circle
                  cx={x2}
                  cy={YEnd}
                  r={10} // Adjust the radius of the circle as needed
                  fill={
                    index < state.YAxisCoordinates.length - 2 ? "green" : "red"
                  } // Adjust the color of the circle as needed
                ></Circle>
                <SvgText
                  x={x2}
                  y={YEnd}
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  fill="white" // Adjust the color of the text as needed
                >
                  {index + 1}
                </SvgText>
              </React.Fragment>
            );
          } else {
            return null;
          }
        })}
        <Circle
          cx={scale(40)}
          cy={graphHeight - state.scheduleSequence[0] * 10 + 10}
          r={6} // Adjust the radius of the circle as needed
          fill="red" // Adjust the color of the circle as needed
        ></Circle>
      </AnimatedSvg>
    );
  };
  
  export default GraphForWeb;
  