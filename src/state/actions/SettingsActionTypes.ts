//Action types for settings reducer
export const SET_TRACKER_EMAIL = "@setTrackerEmail";

export interface setTrackerEmail {
  type: typeof SET_TRACKER_EMAIL;
  payload: string;
}

export type SettingsDispatchTypes = setTrackerEmail;
