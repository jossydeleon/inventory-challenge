import { Dispatch } from "redux";
import { ICredentials, IUser } from "../../types";
import {
  SessionDispatchTypes,
  SET_AUTH_LOADING,
  SET_REMEMBER_ME,
  SET_USER_LOGGED,
} from "./SessionActionTypes";

export const actionSetUser =
  (user: IUser | null) => async (dispatch: Dispatch<SessionDispatchTypes>) => {
    dispatch({
      type: SET_USER_LOGGED,
      payload: user,
    });
  };

export const actionSetSigningInLoading =
  (state: boolean) => async (dispatch: Dispatch<SessionDispatchTypes>) => {
    dispatch({
      type: SET_AUTH_LOADING,
      payload: state,
    });
  };

export const actionSetRememberMe =
  (credentials: ICredentials | null) =>
  async (dispatch: Dispatch<SessionDispatchTypes>) => {
    dispatch({
      type: SET_REMEMBER_ME,
      payload: credentials,
    });
  };
