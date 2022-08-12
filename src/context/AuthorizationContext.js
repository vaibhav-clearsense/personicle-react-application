import { signIn, signOut, clearTokens } from "@okta/okta-react-native";
import createDataContext from "./createDataContext";
import * as SecureStore from "expo-secure-store";

import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload.errorMessage };
    case "sign_in":
      // take sign in action
      console.log("sign in action");

      return {
        token: action.payload.token.access_token,
        logged_in: true,
        errorMessage: "",
      };
    // upon success return new state else log error and return existing state

    case "sign_out":
      return { token: null, logged_in: false, errorMessage: "" };

    case "sign_up":
      return state;
    default:
      return state;
  }
};

const handleError = (dispatch) => {
  return (message) => {
    dispatch({ type: "add_error", payload: { errorMessage: message } });
  };
};

const login = (dispatch) => {
  return async (userEmail, password) => {
    console.log("sign in triggered");
    try {
      const token = await signIn({
        username: userEmail,
        password: password,
      });

      console.log("sign in success");

      await SecureStore.setItemAsync("token", token.access_token);

      await dispatch({ type: "sign_in", payload: { logged_in: true, token } });
      navigate("Profile");
    } catch (error) {
      console.log(error.message);

      dispatch({
        type: "add_error",
        payload: { errorMessage: `Error while signing in ${error.message}` },
      });
    }
  };
};

const logout = (dispatch) => {
  return async () => {
    try {
      const resp = await clearTokens();
      await SecureStore.deleteItemAsync("token");
      dispatch({ type: "sign_out" });
      navigate("Login");
    } catch (err) {
      console.log(err.message);
      dispatch({ type: "add_error", payload: { errorMessage: err.message } });
    }
  };
};

export const { Context, Provider } = createDataContext(
  authReducer,
  { login, logout },
  { logged_in: false, token: null, errorMessage: "" }
);