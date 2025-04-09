import { configureStore, ThunkAction } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Almacenamiento
import { Action, combineReducers } from "redux";

// Importa tu reducer
import themeReducer from "./slices/themeSlice";
import shoppingCartReducer from "./slices/shoppingCartSlice";
import authReducer from "./slices/authSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// Configuración de persistencia
const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: ["theme", "shoppingCart", "auth"],
};

const rootReducer = combineReducers({
    theme: themeReducer,
    shoppingCart: shoppingCartReducer,
    auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST"], // Ignora acciones no serializables
            },
        }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const persistor = persistStore(store);
