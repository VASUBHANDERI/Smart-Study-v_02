import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Context } from "../context/authContext";
import { background, main, primary } from "../components/Colors";
import useWindowSize from "../Hooks/useWindowSize";
import { set } from "react-native-reanimated";
import getMediaQuery from "../Hooks/getMediaQuery";

export default function LogInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { state, signin, clearErrorMessage } = useContext(Context);
  const navigation = useNavigation();
  const [width, height] = useWindowSize();
  const [isDesktopWidth] = getMediaQuery;

  useEffect(() => {
    // Reset the form fields when the component mounts
    setEmail("");
    setPassword("");
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      padding: width / 50,
      alignSelf: "center",
      width: width,
      backgroundColor: background,
      justifyContent: "center",
    },
    main: {
      flex: 1,
      justifyContent: "center",
      marginHorizontal: "auto",
      backgroundColor: background,
      width: width * 0.4,
      height: width * 0.4,
      borderRadius: width / 50,
      alignSelf: "center",
      shadowColor: "#00000040",
      shadowOffset: { height: 0, width: 0 },
      shadowOpacity: 1,
      shadowRadius: width / 60,
      elevation: 200,
    },

    title: {
      fontSize: width / 30,
      fontWeight: "bold",
      color: main,
      alignSelf: "center",
      // borderColor: "black",
      // borderWidth: 1,
      marginBottom: width / 50,
    },
    formContainer: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: width / 20,
      alignItems: "center",
    },
    input: {
      backgroundColor: background,
      borderRadius: width / 10,
      padding: width / 100,
      marginBottom: width / 50,
      fontSize: width / 100,
      borderColor: main,
      borderWidth: width / 1000,
      width: "90%",
    },

    error: {
      color: "red",
      fontSize: width / 100,
      alignSelf: "center",
      marginBottom: width / 100,
    },
    Button: {
      marginHorizontal: 2,
      borderRadius: 5,
      borderColor: main,
      borderWidth: 1,
      paddingVertical: width / 200,
      paddingHorizontal: width / 53,
      backgroundColor: main,
      alignSelf: "center",
      shadowColor: "#00000040", // IOS
      shadowOffset: { height: 1, width: 1 }, // IOS
      shadowOpacity: 1, // IOS
      shadowRadius: 2, //IOS
      elevation: 200,
      marginBottom: width / 100,
    },
  });

  const styles1 = StyleSheet.create({
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
    },
  });

  if (isDesktopWidth) {
    return (
      <View style={styles.container}>
        <View style={styles.main}>
          {/* <View style={styles.titleContainer}></View> */}
          <View style={styles.formContainer}>
            <Text style={styles.title}>Login</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#888"
              onChangeText={(text) => {
                setEmail(text);
                clearErrorMessage;
              }}
              // name="login-email"
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
              style={styles.Button}
              onPress={() => {
                signin({ email, password });
                setEmail("");
                setPassword("");
              }}
            >
              {state.isLoading ? (
                <ActivityIndicator size="small" color={background} />
              ) : (
                <Text
                  style={{
                    color: background,
                    fontWeight: "bold",
                    fontSize: width / 90,
                  }}
                >
                  Log In
                </Text>
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
              <Text
                style={{
                  color: primary,
                  fontSize: width / 90,
                }}
              >
                Don't have an account? Register instead!
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <ScrollView contentContainerStyle={styles1.container}>
        <View style={styles1.main}>
          <View style={styles1.formContainer}>
            <Text style={styles1.title}>Login</Text>
            <TextInput
              style={styles1.input}
              placeholder="Email"
              placeholderTextColor="#888"
              onChangeText={(text) => {
                setEmail(text);
                clearErrorMessage();
              }}
            />
            <TextInput
              style={styles1.input}
              placeholder="Password"
              placeholderTextColor="#888"
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
            />
            <Text style={styles1.error}>{state.errorMessage}</Text>
            <TouchableOpacity
              style={styles1.button}
              onPress={() => {
                signin({ email, password });
                setEmail("");
                setPassword("");
              }}
            >
              {state.isLoading ? (
                <ActivityIndicator size="small" color={background} />
              ) : (
                <Text style={styles1.buttonText}>Log In</Text>
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
              <Text style={styles1.registerText}>
                Don't have an account? Register instead!
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}
