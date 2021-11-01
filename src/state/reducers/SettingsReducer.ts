import { SettingsDispatchTypes } from "../actions/SettingsActionTypes";
import { SET_TRACKER_EMAIL } from "../actions/SettingsActionTypes";

export interface IDefaultSettingsState {
  email?: string;
}

const defaultState: IDefaultSettingsState = {
  email: "",
};

const settingsReducer = (
  state = defaultState,
  action: SettingsDispatchTypes
) => {
  switch (action.type) {
    case SET_TRACKER_EMAIL:
      return {
        ...state,
        email: action.payload,
      };

    default:
      return state;
  }
};

export default settingsReducer;
