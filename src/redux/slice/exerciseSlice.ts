import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IActivity} from "../../types/exercise";

interface IState {
    activity: IActivity[],
    favoriteExercises: string[],
}

// set localStorage
const setLCActivity = (item: IActivity[]) => localStorage.setItem('activity', JSON.stringify(item))
const setLCFavorite = (item: string[]) => localStorage.setItem('favoriteExercises', JSON.stringify(item))

// get localStorage
const activityData: string | null = localStorage.getItem('activity')
const favoriteExercisesData: string | null = localStorage.getItem('favoriteExercises')

const initialState: IState = {
    activity: activityData ? JSON.parse(activityData) : [],
    favoriteExercises: favoriteExercisesData ? JSON.parse(favoriteExercisesData) : [],
}

const exerciseSlice = createSlice({
    name: 'exerciseSlice',
    initialState,
    reducers: {
        toggleFavorite: (state, action: PayloadAction<string>) => {
            const isExist = state.favoriteExercises.some((item: string) => item === action.payload)
            if (isExist) {
                state.favoriteExercises = state.favoriteExercises
                    .filter((item: string) => item !== action.payload)
            } else {
                state.favoriteExercises = [...state.favoriteExercises, action.payload]
            }
            setLCFavorite(state.favoriteExercises)
        }
    }
})

export const {toggleFavorite} = exerciseSlice.actions
export const exerciseSliceReducer = exerciseSlice.reducer