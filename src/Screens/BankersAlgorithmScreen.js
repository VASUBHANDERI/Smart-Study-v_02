import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ToastAndroid,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import Button from "../components/Button";
import { background, main, primary, text, main50 } from "../components/Colors";
import { useFonts } from "expo-font";
import { Feather, Ionicons } from "@expo/vector-icons";
import { scale, verticalScale } from "react-native-size-matters";
import { Context as BankersContext } from "../context/bankersContext";
import { Vibration } from "react-native";
import useWindowSize from "../Hooks/useWindowSize";
import getMediaQuery from "../Hooks/getMediaQuery";

const BankersAlgorithmScreen = () => {
  const [width, height] = useWindowSize();
  const [refresh, setRefresh] = useState(false);
  const { state, Solve } = useContext(BankersContext);

  const [loaded] = useFonts({
    Popins: require("../../public/assets/fonts/Poppins-Light.ttf"),
  });

  const [isMobileWidth, isTabletWidth, isDesktopWidth, isWide] =
    getMediaQuery();
  const algoWidth = isWide ? width * 0.6 : width;
  const algoHeight = isWide ? height : height * 0.6;

  const styles = StyleSheet.create({
    table: {
      flexDirection: "column",
    },
    fillFieldsText: {
      fontSize: algoWidth / 50,
      marginVertical: algoHeight / 100,
      color: "red",
      alignSelf: "center",
    },
    buttonContainer: {
      marginTop: algoHeight / 100,
      marginHorizontal:algoWidth/60,
      width:algoWidth
    },
    row: {
      flexDirection: "row",
      marginBottom: algoHeight / 120,
    },
    rowGreen: {
      flexDirection: "row",
      backgroundColor: "#81f51b50",
      marginBottom: algoHeight / 120,
    },
    rowYellow: {
      flexDirection: "row",
      backgroundColor: "#f7fa5f50",
      marginBottom: algoHeight / 120,
    },
    rowRed: {
      flexDirection: "row",
      backgroundColor: "#f2705c",
      marginBottom: algoHeight / 120,
    },
    headerRow: {
      backgroundColor: "#e3e3e3",
      marginBottom: algoHeight / 120,
    },
    cell: {
      borderWidth: StyleSheet.hairlineWidth,
      padding: algoWidth / 100,
      width: algoWidth / 13,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
    },
    enabledInput: {
      borderWidth: StyleSheet.hairlineWidth,
      padding: algoWidth / 100,
      width: algoWidth / 13,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      color: "black",
    },

    headerText: {
      fontWeight: "bold",
      alignSelf: "center",
    },
    container: {
      flex: 1,
      padding: algoWidth / 100,
      marginHorizontal:algoHeight/50,
    },

    instructions: {
      fontSize: algoWidth / 50,
      marginVertical: algoHeight / 120,
    },

    item: {
      backgroundColor: "#81f51b50",
      width: algoWidth / 20,
      height: algoWidth / 20,
      alignItems: "center",
      justifyContent: "center",
      marginRight: algoWidth / 120,
      borderRadius: algoWidth / 80,
    },
    StepText: {
      alignSelf: "flex-start",
      fontFamily: "Popins",
      marginVertical: algoHeight / 100,
    },
  });
  const [allocation, setAllocation] = useState(state.allocation || [[]]);
  const [maxNeed, setMaxNeed] = useState(state.maxNeed || [[]]);
  const [totalResources, setTotalResources] = useState(
    state.totalResources || [[]]
  );

  const isInputValid = () => {
    const matrices = [allocation, maxNeed, totalResources];

    for (let matrix of matrices) {
      for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
          const cellValue = matrix[i][j];
          if (cellValue === "" || !/^\d{1,2}$/.test(cellValue)) {
            return false;
          }
        }
      }
    }

    return true;
  };

  const renderButtonOrText = () => {
    if (isInputValid()) {
      return (
        <>
          {state.isSubmitted ? (
            <Button
              title="Edit"
              onPress={() => {
                state.isSubmitted = false;
                setCurStep(0);
                setRefresh(!refresh);
              }}
            />
          ) : (
            <Button
              title="Submit"
              onPress={() => {
                if (state.isValidMatrix) {
                  Solve();
                  setCurStep(0);
                  setRefresh(!refresh);
                }
              }}
            />
          )}
        </>
      );
    } else {
      return (
        <Text style={styles.fillFieldsText}>
          *Please fill all fields with numbers (0-99)
        </Text>
      );
    }
  };

  const handleAllocationChange = (rowIndex, colIndex, value) => {
    const updatedAllocation = [...allocation];
    updatedAllocation[rowIndex][colIndex] = value;
    setAllocation(updatedAllocation);
    state.isSubmitted = false;
    state.isValidMatrix = true;
    setRefresh(!refresh);
  };

  const handleMaxNeedChange = (rowIndex, colIndex, value) => {
    const updatedMaxNeed = [...maxNeed];
    updatedMaxNeed[rowIndex][colIndex] = value;
    setMaxNeed(updatedMaxNeed);
    state.isSubmitted = false;
    state.isValidMatrix = true;
    setRefresh(!refresh);
  };

  const handleTotalResources = (rowIndex, colIndex, value) => {
    const updatedTotalResources = [...totalResources];
    updatedTotalResources[rowIndex][colIndex] = value;
    setTotalResources(updatedTotalResources);
    state.isSubmitted = false;
    state.isValidMatrix = true;
    setRefresh(!refresh);
  };

  const renderMatrixInputs = (matrix, handleCellChange) => {
    return (
      <View style={styles.table}>
        <View style={[styles.row, styles.headerRow]}>
          <View style={styles.cell} />
          {matrix.length > 0 &&
            matrix[0].map((_, colIndex) => (
              <View key={colIndex} style={styles.cell}>
                <Text style={styles.headerText}>
                  {String.fromCharCode(65 + colIndex)}
                </Text>
              </View>
            ))}
        </View>
        {matrix.map((row, rowIndex) => (
          <View
            key={rowIndex}
            style={
              matrix === state.totalResources
                ? styles.row // Apply styles.row when matrix is totalResources
                : state.isSubmitted &&
                  !state.isSafe &&
                  state.steps.length == CurStep + 1 &&
                  rowIndex === state.steps[CurStep].processIndex
                ? styles.rowRed
                : state.isSubmitted &&
                  state.steps[CurStep].safeSequence.includes(rowIndex)
                ? styles.rowGreen
                : state.isSubmitted &&
                  rowIndex === state.steps[CurStep].processIndex
                ? styles.rowYellow
                : styles.row
            }
          >
            <View style={[styles.cell, { backgroundColor: "#e3e3e3" }]}>
              {matrix == state.totalResources ? (
                <Text style={styles.headerText}>Total</Text>
              ) : (
                <Text style={styles.headerText}>{`P${rowIndex}`}</Text>
              )}
            </View>
            {row.map((cell, colIndex) => (
              <TextInput
                key={colIndex}
                style={[styles.cell, state.isSubmitted && styles.enabledInput]}
                value={cell}
                onChangeText={(text) =>
                  handleCellChange(rowIndex, colIndex, text)
                }
                keyboardType="numeric"
                placeholder="?"
                editable={!state.isSubmitted}
                selectTextOnFocus={!state.isSubmitted}
              />
            ))}
          </View>
        ))}
      </View>
    );
  };
  const renderMatrix = (matrix, cellStyle) => {
    return (
      <View style={styles.table}>
        <View style={[styles.row, styles.headerRow]}>
          <View style={styles.cell} />
          {matrix.length > 0 &&
            matrix[0].map((_, colIndex) => (
              <View key={colIndex} style={styles.cell}>
                <Text style={styles.headerText}>
                  {String.fromCharCode(65 + colIndex)}
                </Text>
              </View>
            ))}
        </View>

        {matrix.map((row, rowIndex) => (
          <View
            key={rowIndex}
            style={
              state.isSubmitted &&
              !state.isSafe &&
              state.steps.length == CurStep + 1 &&
              rowIndex === state.steps[CurStep].processIndex
                ? styles.rowRed
                : state.isSubmitted &&
                  state.steps[CurStep].safeSequence.includes(rowIndex)
                ? styles.rowGreen
                : state.isSubmitted &&
                  rowIndex === state.steps[CurStep].processIndex
                ? styles.rowYellow
                : styles.row
            }
          >
            <View style={[styles.cell, { backgroundColor: "#e3e3e3" }]}>
              <Text style={styles.headerText}>{`P${rowIndex}`}</Text>
            </View>
            {row.map((cell, colIndex) => (
              <View style={styles.cell}>
                <Text style={cellStyle}>{cell}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    );
  };

  const renderWork = () => {
    const steps = state.steps;
    const stepMatrix =
      state.steps.length != CurStep + 1
        ? steps[CurStep].work.map((cell, colIndex) => cell)
        : state.available[0].map((cell, colIndex) => cell);
    const headerRow = stepMatrix.map((_, colIndex) => (
      <View style={styles.cell}>
        <Text style={styles.headerText}>
          {String.fromCharCode(65 + colIndex)}
        </Text>
      </View>
    ));

    return (
      <View style={styles.table}>
        <View style={[styles.row, styles.headerRow]}>{headerRow}</View>
        <View style={styles.row}>
          {stepMatrix.map((cell, colIndex) => (
            <View style={styles.cell}>
              <Text style={styles.headerText}>{cell}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const [CurStep, setCurStep] = useState(0);
  if (!loaded) {
    return null;
  }

  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: background,
        flex: 1,
        flexDirection: isWide ? "row" : "column",
      }}
    >
      <View style={{ flex: 4 }}>
        <ScrollView
          contentContainerStyle={{
            alignItems: "center",
            backgroundColor: background,
            borderRightColor: "grey",
            borderBottomColor: "grey",
            borderRightWidth: isWide ? algoWidth / 100 : 0,
            borderBottomWidth: isWide ? 0 : algoWidth / 100,
            flex: 1,
          }}
          showsVerticalScrollIndicator={true}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text>Content will be available soon!</Text>
            <Text>{width}</Text>
            <Text>{algoWidth}</Text>
          </View>
        </ScrollView>
      </View>

      <View style={{ flex: 6 }}>
        <ScrollView
          contentContainerStyle={{
            alignItems: "center",
            backgroundColor: background,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              flexDirection: "row",
              marginTop: algoHeight / 50,
            }}
          >
            <View
              style={{
                backgroundColor: background,
                marginHorizontal: algoWidth / 50,
                paddingHorizontal: algoWidth / 20,
              }}
            >
              <View>
                <Text
                  style={{
                    alignSelf: "center",
                    color: text,
                    fontSize: algoWidth / 40,
                    fontFamily: "Popins",
                  }}
                >
                  No. of Resources
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    margin: algoWidth / 50,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      if (state.numResources > 0) {
                        state.numResources = state.numResources - 1;
                        state.allocation = Array.from(
                          { length: state.numProcesses },
                          () => Array(state.numResources).fill("")
                        );
                        state.maxNeed = Array.from(
                          { length: state.numProcesses },
                          () => Array(state.numResources).fill("")
                        );
                        state.totalResources = Array.from({ length: 1 }, () =>
                          Array(state.numResources).fill("")
                        );
                        setTotalResources(state.totalResources);
                        setAllocation(state.allocation);
                        setMaxNeed(state.maxNeed);
                        state.isSubmitted = false;
                        state.isValidMatrix = true;
                        setRefresh(!refresh);
                        Vibration.vibrate(80);
                      } else {
                        alert(
                          "Sorry! Can't decrease No. of Resources anymore!"
                        );
                      }
                    }}
                  >
                    <Feather
                      name="minus-circle"
                      size={algoWidth / 20}
                      color={text}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      paddingHorizontal: algoWidth / 50,
                      color: text,
                      fontSize: algoWidth / 40,
                      alignSelf: "center",
                      fontFamily: "Popins",
                    }}
                  >
                    {state.numResources}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      if (state.numResources < 5) {
                        state.numResources = state.numResources + 1;
                        state.allocation = Array.from(
                          { length: state.numProcesses },
                          () => Array(state.numResources).fill("")
                        );
                        state.maxNeed = Array.from(
                          { length: state.numProcesses },
                          () => Array(state.numResources).fill("")
                        );
                        state.totalResources = Array.from({ length: 1 }, () =>
                          Array(state.numResources).fill("")
                        );
                        setTotalResources(state.totalResources);
                        setAllocation(state.allocation);
                        setMaxNeed(state.maxNeed);
                        state.isSubmitted = false;
                        state.isValidMatrix = true;
                        setRefresh(!refresh);
                        Vibration.vibrate(80);
                      } else {
                        alert(
                          "Sorry! Can't increase No. of Resources anymore!"
                        );
                      }
                    }}
                  >
                    <Feather
                      name="plus-circle"
                      size={algoWidth / 20}
                      color={text}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View
              style={{
                backgroundColor: background,
                marginHorizontal: algoWidth / 50,
                paddingHorizontal: algoWidth / 20,
              }}
            >
              <View>
                <Text
                  style={{
                    alignSelf: "center",
                    color: text,
                    fontSize: algoWidth / 40,
                    fontFamily: "Popins",
                  }}
                >
                  No. of Processes
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    margin: algoWidth / 50,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      if (state.numProcesses > 0) {
                        state.numProcesses = state.numProcesses - 1;
                        state.allocation = Array.from(
                          { length: state.numProcesses },
                          () => Array(state.numResources).fill("")
                        );
                        state.maxNeed = Array.from(
                          { length: state.numProcesses },
                          () => Array(state.numResources).fill("")
                        );
                        state.totalResources = Array.from({ length: 1 }, () =>
                          Array(state.numResources).fill("")
                        );
                        setTotalResources(state.totalResources);
                        setAllocation(state.allocation);
                        setMaxNeed(state.maxNeed);
                        state.isSubmitted = false;
                        state.isValidMatrix = true;
                        setRefresh(!refresh);
                        Vibration.vibrate(80);
                      } else {
                        alert(
                          "Sorry! Can't decrease  No. of Processes anymore!"
                        );
                      }
                    }}
                  >
                    <Feather
                      name="minus-circle"
                      size={algoWidth / 20}
                      color={text}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      paddingHorizontal: algoWidth / 50,
                      color: text,
                      fontSize: algoWidth / 40,
                      alignSelf: "center",
                      fontFamily: "Popins",
                    }}
                  >
                    {state.numProcesses}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      if (state.numProcesses < 5) {
                        state.numProcesses = state.numProcesses + 1;
                        state.allocation = Array.from(
                          { length: state.numProcesses },
                          () => Array(state.numResources).fill("")
                        );
                        state.maxNeed = Array.from(
                          { length: state.numProcesses },
                          () => Array(state.numResources).fill("")
                        );
                        state.totalResources = Array.from({ length: 1 }, () =>
                          Array(state.numResources).fill("")
                        );
                        setTotalResources(state.totalResources);
                        setAllocation(state.allocation);
                        setMaxNeed(state.maxNeed);
                        state.isSubmitted = false;
                        state.isValidMatrix = true;
                        setRefresh(!refresh);
                        Vibration.vibrate(80);
                      } else {
                        alert(
                          "Sorry! Can't increase  No. of Processes anymore!"
                        );
                      }
                    }}
                  >
                    <Feather
                      name="plus-circle"
                      size={algoWidth / 20}
                      color={text}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View style={{ paddingVertical: algoHeight / 100 }}>
            {state.numResources > 0 ? (
              <View style={styles.container}>
                <Text style={styles.instructions}>Total Resources:</Text>
                {renderMatrixInputs(state.totalResources, handleTotalResources)}
              </View>
            ) : null}
            {state.numProcesses > 0 && state.numResources > 0 ? (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "stretch",
                    alignContent: "flex-start",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={styles.container}>
                    <Text style={styles.instructions}>Allocation:</Text>
                    {renderMatrixInputs(
                      state.allocation,
                      handleAllocationChange
                    )}
                  </View>
                  <View style={styles.container}>
                    <Text style={styles.instructions}>Max Need:</Text>
                    {renderMatrixInputs(state.maxNeed, handleMaxNeedChange)}
                  </View>
                </View>
                <View style={styles.buttonContainer}>
                  {renderButtonOrText()}
                </View>
              </>
            ) : null}

            {state.steps.length > 0 &&
            state.isSubmitted &&
            state.isValidMatrix ? (
              <>
                <View>
                  <View style={styles.container}>
                    <Text style={styles.instructions}>Need:</Text>
                    {renderMatrix(state.need, styles.headerText)}
                  </View>
                </View>
                <View>
                  <View style={styles.container}>
                    <Text style={styles.instructions}>Available:</Text>
                    {renderWork()}
                  </View>
                </View>
                <View style={{width:algoWidth}}>
                {state.isSafe ? (
                  <View
                    style={{
                      margin: scale(5),
                      borderColor: "#81f51b90",
                      backgroundColor: "#81f51b30",
                      borderWidth: scale(2),
                      borderRadius: scale(10),
                    }}
                  >
                    <Text
                      style={{
                        alignSelf: "center",
                        fontFamily: "Popins",
                        fontSize: algoWidth / 40,
                        color: "#30910a",
                        fontWeight: "bold",
                        marginVertical: verticalScale(10),
                      }}
                    >
                      This is Safe
                    </Text>
                  </View>
                ) : (
                  <View
                    style={{
                      margin: scale(5),
                      borderColor: "#f2705c",
                      backgroundColor: "#f2705c30",
                      borderWidth: scale(2),
                      borderRadius: scale(10),
                    }}
                  >
                    <Text
                      style={{
                        alignSelf: "center",
                        fontFamily: "Popins",
                        fontSize: algoWidth / 40,
                        color: "#f2705c",
                        fontWeight: "bold",
                        marginVertical: verticalScale(10),
                      }}
                    >
                      This is not safe
                    </Text>
                  </View>
                )}
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderColor: primary,
                    borderWidth: scale(1),
                    alignItems: "center",
                    marginHorizontal: scale(3),
                    borderRadius: scale(5),
                    paddingVertical: verticalScale(10),
                    marginVertical: verticalScale(15),
                  }}
                >
                  {CurStep != 0 ? (
                    <TouchableOpacity
                      onPress={() => {
                        setCurStep(CurStep - 1);
                      }}
                    >
                      <Ionicons
                        name="chevron-back-outline"
                        size={40}
                        color={main}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity>
                      <Ionicons
                        name="chevron-back-outline"
                        size={40}
                        color={"#E07A5F50"}
                      />
                    </TouchableOpacity>
                  )}

                  <View
                    style={{
                      flex: 1,
                      alignSelf: "center",
                      flexWrap: "nowrap",
                    }}
                  >
                    <Text
                      style={{
                        alignSelf: "center",
                        fontFamily: "Popins",
                        marginBottom: verticalScale(5),
                      }}
                    >
                      Step = {CurStep + 1}
                    </Text>
                    <Text style={styles.StepText}>
                      {state.steps[CurStep].description}
                    </Text>
                    <Text style={styles.StepText}>
                      {"Check : Need <= Available"}
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.StepText}>
                        [{state.steps[CurStep].need.join(", ")}]
                      </Text>
                      <Text style={styles.StepText}>{" <= "}</Text>
                      <Text style={styles.StepText}>
                        [{state.steps[CurStep].work.join(", ")}]
                      </Text>
                      <Text style={styles.StepText}> condition is </Text>
                      <Text
                        style={styles.StepText}
                      >{`${state.steps[CurStep].isFinish}`}</Text>
                    </View>
                    {state.steps[CurStep].isFinish ? (
                      <>
                        <Text style={styles.StepText}>
                          {state.steps[CurStep].description1}
                        </Text>
                        <View style={{ flexDirection: "row" }}>
                          <Text style={styles.StepText}>
                            [{state.steps[CurStep].work.join(", ")}]
                          </Text>

                          <Text style={styles.StepText}>{" + "}</Text>

                          <Text style={styles.StepText}>
                            [{state.steps[CurStep].allocation.join(", ")}]
                          </Text>

                          <Text style={styles.StepText}> = </Text>

                          <Text style={styles.StepText}>
                            [{state.steps[CurStep].total.join(", ")}]
                          </Text>
                        </View>
                        <Text style={styles.StepText}>
                          Hence, This process is Finished
                        </Text>
                      </>
                    ) : null}
                    {CurStep != state.steps.length - 1 ? (
                      <Text style={styles.StepText}>
                        {state.steps[CurStep].lastStatement}
                      </Text>
                    ) : CurStep == state.steps.length - 1 && state.isSafe ? (
                      <Text style={styles.StepText}>
                        Now, All Processes are Finished
                      </Text>
                    ) : CurStep == state.steps.length - 1 && !state.isSafe ? (
                      <Text style={styles.StepText}>
                        Now, We can not move further. Hence it is Unsafe
                      </Text>
                    ) : (
                      <Text style={styles.StepText}></Text>
                    )}
                    {!state.steps[CurStep].isFinish ? (
                      <>
                        <Text style={styles.StepText}> </Text>
                        <View style={{ flexDirection: "row" }}>
                          <Text style={styles.StepText}> </Text>
                          <Text style={styles.StepText}> </Text>
                        </View>
                        <Text style={styles.StepText}> </Text>
                      </>
                    ) : null}
                    <Text style={styles.instructions}></Text>
                    <Text style={styles.instructions}>Safe Sequence:</Text>
                    <View
                      style={{
                        alignSelf: "center",
                        marginTop: verticalScale(10),
                      }}
                    >
                      <FlatList
                        style={{ maxHeight: verticalScale(45) }}
                        data={state.steps[CurStep].safeSequence}
                        renderItem={({ item }) => (
                          <View style={styles.item}>
                            <Text style={{ color: "#4f8a01" }}>P{item}</Text>
                          </View>
                        )}
                        keyExtractor={(item) => item}
                        horizontal
                        showsHorizontalScrollIndicator={true}
                      />
                    </View>
                  </View>
                  {CurStep != state.steps.length - 1 ? (
                    <TouchableOpacity
                      onPress={() => {
                        if (CurStep < state.steps.length) {
                          setCurStep(CurStep + 1);
                        }
                      }}
                    >
                      <Ionicons
                        name="chevron-forward-outline"
                        size={40}
                        color={main}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity>
                      <Ionicons
                        name="chevron-forward-outline"
                        size={40}
                        color={"#E07A5F50"}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </>
            ) : state.steps.length > 0 && !state.isValidMatrix ? (
              <Text style={styles.fillFieldsText}>
                *Given Matrix Values are not Valid. Please enter Valid Matrix
              </Text>
            ) : null}
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default BankersAlgorithmScreen;
