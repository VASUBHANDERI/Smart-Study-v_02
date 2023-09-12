import { useContext, useEffect } from "react";
import HomeScreen from "../src/Screens/HomeScreen";
import { Context as AuthContext } from "../src/context/authContext";
import Head from "expo-router/head";
import LoginScreen from "../src/Screens/LogInScreen";

export default function Page() {
  const {
    state: { isLoggedIn },
    tryLocalAuth,signout
  } = useContext(AuthContext);

  useEffect(() => {
    tryLocalAuth();
  }, []);
  console.log("is logged in", isLoggedIn);
  return (
    <>
      {/* <Head>
        <title>Smart Study</title>
        <link rel="shortcut icon" href="../public/assets/favicon.png" />
      </Head> */}
      {isLoggedIn?<HomeScreen />:<LoginScreen/>}
    </>
  );
}
