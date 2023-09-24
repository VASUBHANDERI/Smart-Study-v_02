import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PlayGroundScreen from "./PlayGroundScreen";
import DirectoryDetailScreen from './DirectoryDetailScreen';
import FileStructureScreen from './FileStructureScreen';


const Stack = createNativeStackNavigator();

const PlayGroundStack = () => {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="Play Ground"
        component={PlayGroundScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Directory Detail"
        component={DirectoryDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="File Structure"
        component={FileStructureScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default PlayGroundStack;
