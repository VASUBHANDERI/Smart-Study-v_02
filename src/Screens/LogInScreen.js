import { useContext, useEffect, useState } from "react";
import { Button, Dimensions, StyleSheet, Text, View } from "react-native";
import { apiInstance, setAuthToken } from "../API/spectraStudyAPI";
import { Link, useNavigation, useRouter } from "expo-router";
import { Context } from "../context/authContext";
// import { navigate } from "../navigationRef";

export default function LogInScreen({ navigation }) {
  const { token, setToken } = useState(null);
  const [data, setData] = useState({});
  const [err, setErr] = useState({});
  const { state, signin } = useContext(Context);

  const router = useRouter();
  //   const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Hello World</Text>
        <Text style={styles.subtitle}>This is the first page of your app.</Text>
        <Button
          title="Login"
          onPress={() => {
            signin({
              email: "vasu@gmail.com",
              password: "123",
            });
          }}
        />
        <Button
          title="createAccount"
          onPress={() => {
            router.push("/RegistrationScreen");
          }}
        />
        
        <View style={styles.buttonStyle} />
      </View>
      <Text>Response</Text>
      <View style={styles.buttonStyle} />
      <Text>{state.token}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    maxWidth: 960,
    alignSelf: "center",
    width: Dimensions.get("screen").width,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
  buttonStyle: {
    margin: 1,
  },
});
