import { Tuple, combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice"
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {thunk} from 'redux-thunk'
import dashboardReducer from "./dashboard/dashboardSlice";
import shiftSubmitReducer from "./dashboard/shiftSubmitSlice";

const rootPersistConfig = {
    key: 'root',
    storage,
    safelist: ['user'],
    blacklist: ['dashboard', 'shiftSubmit']
}

const rootReducer = combineReducers({
    user: userReducer,
    dashboard: dashboardReducer,
    shiftSubmit: shiftSubmitReducer
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
})

export default store
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch