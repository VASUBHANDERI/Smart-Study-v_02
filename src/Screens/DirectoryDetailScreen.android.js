import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import { Context } from "../context/commandsContext";
import { Feather } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { background, primary, text } from "../components/Colors";
import { scale, verticalScale } from "react-native-size-matters";

Text.defaultProps = {
  ...(Text.defaultProps || {}),
  allowFontScaling: false,
};
const DirectoryDetailScreen = (props) => {
  const name = props.route.params.name;
  const { state } = useContext(Context);
  var dir_id;
  var i = state.dirs.length;
  while (i--) {
    if (state.dirs[i].name == name) {
      dir_id = i;
    }
  }
  var n = state.dirs[dir_id].files.length;
  const [loaded] = useFonts({
    Popins: require("../../public/assets/fonts/Poppins-Light.ttf"),
  });
  if (!loaded) {
    return null;
  }
  if (n > 0) {
    return (
      <View style={{ backgroundColor: background, flex: 1 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={state.dirs[dir_id].files}
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
          {`Files are not generated yet in ${name}`}
        </Text>
      </View>
    );
  }
};

export default DirectoryDetailScreen;

const styles = StyleSheet.create({
  rowContainer: {
    marginVertical: verticalScale(1),
    backgroundColor: background,
    paddingVertical: verticalScale(7),
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    // justifyContent:'center'
  },
  textStyle: {
    fontSize: scale(18),
    marginLeft: scale(10),
    color: text,
    fontFamily: "Popins",
  },
});
