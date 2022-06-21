import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import {exerciseSliceReducer} from './slice/exerciseSlice';

const rootReducer = combineReducers({
    exercises: exerciseSliceReducer,
})

export const store = configureStore({
    reducer: rootReducer,
})

type storeType = typeof store
export type dispatchType = storeType['dispatch']
export type reducerType = ReturnType<typeof rootReducer>