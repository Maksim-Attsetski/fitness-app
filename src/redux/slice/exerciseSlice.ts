import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IActivity, IExercise} from "../../types/exercise";
import {exerciseList} from "../../db/lists";
import {checkGender} from "../../helpers/checkGender";
import {checkLevel} from "../../helpers/checkLevel";

interface IState {
    exercises: IExercise[],
    activity: IActivity[],
    favoriteExercises: IExercise[],
}

// set localStorage
const setLCActivity = (item: IActivity[]) => localStorage.setItem('activity', JSON.stringify(item))
const setLCFavorite = (item: IExercise[]) => localStorage.setItem('favoriteExercises', JSON.stringify(item))

// get localStorage
const activityData: string | null = localStorage.getItem('activity')
const favoriteExercisesData: string | null = localStorage.getItem('favoriteExercises')

// get exercises
const getExercises = (): IExercise[] => {
    if (!!localStorage.getItem('isPlanExist')) {
        const genderList: IExercise[] = checkGender(exerciseList)
        return checkLevel(genderList)
    }
    return exerciseList
}

const initialState: IState = {
    activity: activityData ? JSON.parse(activityData) : [],
    favoriteExercises: favoriteExercisesData ? JSON.parse(favoriteExercisesData) : [],
    exercises: getExercises(),
}

const exerciseSlice = createSlice({
    name: 'exerciseSlice',
    initialState,
    reducers: {
        setExercises: (state) => {
            if (!!localStorage.getItem('isPlanExist')) {
                const genderList: IExercise[] = checkGender(exerciseList)
                state.exercises = checkLevel(genderList)
            } else {
                state.exercises = exerciseList
            }
        },
        toggleFavorite: (state, action: PayloadAction<IExercise>) => {
            const isExist = state.favoriteExercises.some((item: IExercise) => item.id === action.payload.id)
            if (isExist) {
                state.favoriteExercises = state.favoriteExercises
                    .filter((item: IExercise) => item.id !== action.payload.id)
            } else {
                state.favoriteExercises = [...state.favoriteExercises, action.payload]
            }
            setLCFavorite(state.favoriteExercises)
        },
        setActivity: (state, action: PayloadAction<IActivity>) => {
            const isExist = state.activity.some((item: IActivity) => item.exerciseName === action.payload.exerciseName)
            if (isExist) {
                state.activity = state.activity
                    .map((item: IActivity) => item.exerciseName === action.payload.exerciseName
                        ? action.payload : item)
            } else {
                state.activity = [...state.activity, action.payload]
            }
            setLCActivity(state.activity)
        }
    }
})

export const {toggleFavorite, setActivity, setExercises} = exerciseSlice.actions
export const exerciseSliceReducer = exerciseSlice.reducer