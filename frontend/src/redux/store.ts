import { Tuple, combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice"
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {thunk} from 'redux-thunk'

const rootPersistConfig = {
    key: 'root',
    storage,
    safelist: ['user']
}

const rootReducer = combineReducers({
    user: userReducer
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: () => new Tuple(thunk),
})

export default store
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch