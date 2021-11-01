import { combineReducers } from "redux";
import databaseReducer from "./DatabaseReducer";
import sessionReducer from "./SessionReducer";
import settingsReducer from "./SettingsReducer";

const RootReducers = combineReducers({
  session: sessionReducer,
  database: databaseReducer,
  settings: settingsReducer,
});

export default RootReducers;
