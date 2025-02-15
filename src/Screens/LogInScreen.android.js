import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Context } from "../context/authContext";
import { background, main, primary } from "../components/Colors";
import useWindowSize from "../Hooks/useWindowSize";
import { ScrollView } from "react-native";

export default function LogInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { state, signin, clearErrorMessage, guestsignin } = useContext(Context);
  const navigation = useNavigation();
  const [width, height] = useWindowSize();

  useEffect(() => {
    // Reset the form fields when the component mounts
    setEmail("");
    setPassword("");
  }, []);

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: background,
    },
    main: {
      flex: 0.6, // Reduce the height of the main container
      width: width * 0.85, // Increase the width of the main container
      justifyContent: "center",
      marginHorizontal: width * 0.1,
      backgroundColor: background,
      paddingHorizontal: width * 0.05, // Increase padding for readability
      paddingVertical: width * 0.01, // Increase padding for readability
      borderRadius: width * 0.02,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    title: {
      fontSize: width * 0.1, // Increase the font size for readability
      fontWeight: "bold",
      color: main,
      alignSelf: "center",
      marginBottom: width * 0.03,
    },
    formContainer: {
      paddingHorizontal: width * 0.05,
    },
    input: {
      backgroundColor: background,
      borderRadius: width * 0.02,
      padding: width * 0.02, // Increase padding for readability
      marginBottom: width * 0.02,
      fontSize: width * 0.03, // Increase the font size for readability
      borderColor: main,
      borderWidth: 1,
    },
    error: {
      color: "red",
      fontSize: width * 0.03, // Increase the font size for readability
      alignSelf: "center",
      marginBottom: width * 0.02,
    },
    button: {
      backgroundColor: main,
      borderRadius: width * 0.01,
      paddingVertical: width * 0.02, // Increase padding for readability
      paddingHorizontal: width * 0.03,
      alignSelf: "center",
      marginBottom: width * 0.02,
    },
    buttonText: {
      color: background,
      fontWeight: "bold",
      fontSize: width * 0.03, // Increase the font size for readability
    },
    registerText: {
      color: primary,
      fontSize: width * 0.03, // Increase the font size for readability
      alignSelf: "center",
      marginBottom: width * 0.02,
    },
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.main}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888"
            onChangeText={(text) => {
              setEmail(text);
              clearErrorMessage();
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
          <Text style={styles.error}>{state.errorMessage}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              signin({ email, password });
              setEmail("");
              setPassword("");
            }}
          >
            {state.isLoading ? (
              <ActivityIndicator size="small" color={background} />
            ) : (
              <Text style={styles.buttonText}>Log In</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Registration");
              clearErrorMessage();
              setEmail("");
              setPassword("");
            }}
          >
            <Text style={styles.registerText}>
              Don't have an account? Register instead!
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              guestsignin();
              setEmail("");
              setPassword("");
            }}
          >
            {state.isGuestLoading ? (
              <ActivityIndicator size="small" color={background} />
            ) : (
              <Text style={styles.buttonText}>Log In as Guest</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
