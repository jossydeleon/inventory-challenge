import { ICredentials, IUser } from "../../types";
import {
  SET_USER_LOGGED,
  SET_AUTH_LOADING,
  SET_REMEMBER_ME,
  SessionDispatchTypes,
} from "../actions/SessionActionTypes";

export interface IDefaultSessionState {
  isAuthenticated: boolean;
  user: IUser | null;
  isLoading: boolean;
  rememberMe: ICredentials | null;
}

const defaultState: IDefaultSessionState = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
  rememberMe: null,
};

const sessionReducer = (state = defaultState, action: SessionDispatchTypes) => {
  switch (action.type) {
    case SET_USER_LOGGED:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: action.payload !== null,
      };

    case SET_AUTH_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case SET_REMEMBER_ME:
      return {
        ...state,
        rememberMe: action.payload,
      };

    default:
      return state;
  }
};

export default sessionReducer;
