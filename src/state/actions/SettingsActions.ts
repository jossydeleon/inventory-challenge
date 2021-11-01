import { Dispatch } from "redux";
import {
  SettingsDispatchTypes,
  SET_TRACKER_EMAIL,
} from "./SettingsActionTypes";

export const actionSetTrackerEmail =
  (email: string) => async (dispatch: Dispatch<SettingsDispatchTypes>) => {
    dispatch({
      type: SET_TRACKER_EMAIL,
      payload: email,
    });
  };
