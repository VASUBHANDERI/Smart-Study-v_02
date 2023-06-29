import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import { Feather } from "@expo/vector-icons";
import { Context as commandContext } from "../context/commandsContext";
import { useNavigation } from "@react-navigation/native";
import { background, primary, text } from "../components/Colors";
import { useFonts } from "expo-font";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
Text.defaultProps = {
  ...(Text.defaultProps || {}),
  allowFontScaling: false,
};
const FileStructureScreen = () => {
  const navigation = useNavigation();
  const { state } = useContext(commandContext);
  var n = state.dirs.concat(state.files).length;
  const [loaded] = useFonts({
    Popins: require("../../assets/fonts/Poppins-Light.ttf"),
  });
  if (!loaded) {
    return null;
  }
  if (n > 0) {
    return (
      <View style={{ backgroundColor: background, flex: 1 }}>
        <View
          style={{
            backgroundColor: background,
          }}
        >
          <FlatList
            showsVerticalScrollIndicator={false}
            data={state.dirs}
            keyExtractor={(data) => `${Math.random(1, 100) * data.id}`}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("DirectoryDetail", { name: item.name });
                  }}
                >
                  <View style={styles.rowContainer}>
                    <Feather
                      name="folder"
                      size={scale(24)}
                      color={text}
                      style={{ marginHorizontal: scale(5) }}
                    />
                    <Text style={styles.textStyle}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
          <FlatList
            showsVerticalScrollIndicator={false}
            data={state.files}
            keyExtractor={(data) => `${Math.random(1, 100) * data.id}`}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity>
                  <View style={styles.rowContainer}>
                    <Feather
                      name="file"
                      size={scale(24)}
                      color={text}
                      style={{ marginHorizontal: scale(5) }}
                    />
                    <Text style={styles.textStyle}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    );
  } else {
    return (
      <View
        style={{
          justifyContent: "center",
          flex: 1,
          alignItems: "center",
          backgroundColor: background,
        }}
      >
        <Text
          style={{ color: primary, fontSize: scale(16), fontFamily: "Popins" }}
        >
          Files/Folders are not generated yet!
        </Text>
      </View>
    );
  }
};

export default FileStructureScreen;

const styles = StyleSheet.create({
  rowContainer: {
    marginVertical: verticalScale(1),
    backgroundColor: background,
    paddingVertical: verticalScale(7),
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  textStyle: {
    fontSize: scale(18),
    marginLeft: scale(10),
    color: text,
    fontFamily: "Popins",
  },
});
