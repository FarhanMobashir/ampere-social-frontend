import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user-slice";
import { apiSlice } from "./services/api-slice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { devToolsEnhancer } from "@reduxjs/toolkit/dist/devtoolsExtension";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: [apiSlice.reducerPath],
  whitelist: ["user"],
};

// added a root reducer
const rootReducer = combineReducers({
  user: userSlice,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

// created a type from root reducer
type RootReducer = ReturnType<typeof rootReducer>;

// added the type in persistReducer
const persistedReducer = persistReducer<RootReducer>(
  persistConfig,
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware);
  },
});

export const persistor = persistStore(store);

// For typescript
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<any>;
