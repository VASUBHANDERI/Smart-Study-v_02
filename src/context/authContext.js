import createDataContext from "./createDataContext";
import {
  apiInstance,
  resetAuthToken,
  setAuthToken,
} from "../API/spectraStudyAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getError from "../Hooks/getError";

const authReducer = (state, action) => {
  switch (action.type) {
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "authenticate":
      return { token: action.payload, errorMessage: "", isLoggedIn: true };
    case "localAuth":
      return {
        token: action.payload.token,
        username: action.payload.username, // Add username to state
        errorMessage: "",
        isLoggedIn: true,
      };
    case "getUser":
      return {
        ...state,
        username: action.payload.username,
      };
    case "set_loading":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "signout":
      return { token: null, errorMessage: "", isLoggedIn: false };

    default:
      return state;
  }
};

const tryLocalAuth = (dispatch) => async () => {
  // dispatch({ type: "set_loading", payload: true });
  const token = await AsyncStorage.getItem("token");
  if (token) {
    try {
      dispatch({ type: "authenticate", payload: token });
      const response = await apiInstance.get("/api/users/current"); // Fetch user data
      dispatch({
        type: "localAuth",
        payload: { token, username: response.data.username }, // Include username
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: "signout" });
    }
  } else {
    dispatch({ type: "signout" });
  }
};
const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};

const signup =
  (dispatch) =>
  async ({ username, email, password }) => {
    dispatch({ type: "set_loading", payload: true });
    try {
      const response = await apiInstance.post("/api/users/register", {
        username,
        email,
        password,
      });
      setAuthToken(response.data.accessToken);
      await AsyncStorage.setItem("token", response.data.accessToken);
      dispatch({ type: "authenticate", payload: response.data.accessToken });
    } catch (e) {
      dispatch({
        type: "add_error",
        payload: getError(e.message),
      });
    }
    dispatch({ type: "set_loading", payload: false });
  };

const signin =
  (dispatch) =>
  async ({ email, password }) => {
    dispatch({ type: "set_loading", payload: true });
    try {
      const response = await apiInstance.post("/api/users/login", {
        email,
        password,
      });
      if (response) {
        setAuthToken(response.data.accessToken);
        await AsyncStorage.setItem("token", response.data.accessToken);
        console.log(response.data.accessToken);
        dispatch({ type: "authenticate", payload: response.data.accessToken });
      }
    } catch (e) {
      console.log(e);
      dispatch({
        type: "add_error",
        payload: getError(e.message),
      });
    }
    dispatch({ type: "set_loading", payload: false });
  };

const signout = (dispatch) => async () => {
  dispatch({ type: "set_loading", payload: false });
  await AsyncStorage.removeItem("token");
  resetAuthToken();
  dispatch({ type: "signout" });
};

export const { Context, Provider } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage, tryLocalAuth },
  {
    token: null,
    errorMessage: "",
    isLoggedIn: false,
    username: "Guest",
    isLoading: false,
  }
);
