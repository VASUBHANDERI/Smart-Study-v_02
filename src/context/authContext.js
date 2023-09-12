import createDataContext from "./createDataContext";
import {
  apiInstance,
  resetAuthToken,
  setAuthToken,
} from "../API/spectraStudyAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";

const authReducer = (state, action) => {
  switch (action.type) {
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "authenticate":
      return { token: action.payload, errorMessage: "" };
    case "signout":
      return { token: null, errorMessage: "" };
    default:
      return state;
  }
};

const tryLocalAuth = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: "authenticate", payload: token });
  } else {
  }
};
const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};

const signup =
  (dispatch) =>
  async ({ username, email, password }) => {
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
        payload: "Something Went Wrong With Sign Up",
      });
    }
  };

const signin =
  (dispatch) =>
  async ({ email, password }) => {
    try {
      const response = await apiInstance.post("/api/users/login", {
        email,
        password,
      });
      setAuthToken(response.data.accessToken);
      await AsyncStorage.setItem("token", response.data.accessToken);
      dispatch({ type: "authenticate", payload: response.data.accessToken });
    } catch (e) {
      dispatch({
        type: "add_error",
        payload: "Something Went Wrong With Sign In",
      });
    }
  };

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem("token");
  resetAuthToken();
  dispatch({ type: "signout" });
};

export const { Context, Provider } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage, tryLocalAuth },
  { token: null, errorMessage: "" }
);
