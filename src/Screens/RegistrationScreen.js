import { useContext, useEffect, useState } from "react";
import {
  Button,
  Dimensions,
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

export default function RegistrationScreen() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { state, signup, clearErrorMessage } = useContext(Context);
  const navigation = useNavigation();
  const [width, height] = useWindowSize();

  useEffect(() => {
    // Reset the form fields when the component mounts
    setUsername("");
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
      width: "60%",
      height: "80%",
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
      width: "60%",
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

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Registration</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#888"
            onChangeText={(text) => {
              setUsername(text);
              clearErrorMessage;
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888"
            onChangeText={(text) => {
              setEmail(text);
              clearErrorMessage;
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
            style={styles.Button}
            onPress={() => {
              signup({ username, email, password });
              setUsername("");
              setEmail("");
              setPassword("");
            }}
          >
            <Text
              style={{
                color: background,
                fontWeight: "bold",
                fontSize: width / 90,
              }}
            >
              Register
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Log In");
              clearErrorMessage();
              setUsername("");
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
              Do you have an account? Login instead!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
