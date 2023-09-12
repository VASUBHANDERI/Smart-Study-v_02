import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LogInScreen from "./LogInScreen";
import RegistrationScreen from "./RegistrationScreen";


const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen name="LoginScreen" component={LogInScreen} />
      <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;