import { ICredentials, IUser } from "../../types";

//Action types for settings reducer
export const SET_USER_LOGGED = "@setUserLogged";
export const SET_REMEMBER_ME = "@setRememberMe";
export const SET_AUTH_LOADING = "@setAuthLoading";

export interface setUserLogged {
  type: typeof SET_USER_LOGGED;
  payload: IUser | null;
}

export interface setLoading {
  type: typeof SET_AUTH_LOADING;
  payload: boolean;
}

export interface setRememberMe {
  type: typeof SET_REMEMBER_ME;
  payload: ICredentials | null;
}

export type SessionDispatchTypes = setUserLogged | setLoading | setRememberMe;
