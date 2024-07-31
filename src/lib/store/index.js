import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import UserReducer from "./slice/user/UserSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["auth"],
};
const rootReducer = combineReducers({
  auth: UserReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});
export const persistor = persistStore(store);
