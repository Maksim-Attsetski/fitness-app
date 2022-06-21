import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({

})

export const store = configureStore({
    reducer: rootReducer,
})

type storeType = typeof store
export type dispatchType = storeType['dispatch']
export type reducerType = ReturnType<typeof rootReducer>