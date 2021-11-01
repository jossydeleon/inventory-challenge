import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import RootReducers from "./reducers/RootReducers";

const persistConfig = {
  key: "inventory",
  storage,
};

const persistedReducer = persistReducer<RootStore, any>(
  persistConfig,
  RootReducers
);

const Store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export type RootStore = ReturnType<typeof RootReducers>;

export const persistor = persistStore(Store);

export default Store;
