import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LogInScreen from "./LogInScreen";
import RegistrationScreen from "./RegistrationScreen";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="Log In"
        component={LogInScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Registration"
        component={RegistrationScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
