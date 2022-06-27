import {IAnswer} from "../../types/quiz";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IState {
    answers: IAnswer[],
    isPlanExist: boolean
}

const answerData: string | null = localStorage.getItem('answers')

const initialState: IState = {
    answers: answerData ? JSON.parse(answerData) : [],
    isPlanExist: !!localStorage.getItem('isPlanExist'),
}
const setLCAnswer = (item: IAnswer[]) => localStorage.setItem('answers', JSON.stringify(item))

const quizSlice = createSlice({
    name: 'quizSlice',
    initialState,
    reducers: {
        setAnswer: (state, action: PayloadAction<IAnswer>) => {
            const isExist = state.answers.some((item: IAnswer) => item.id === action.payload.id)

            if (isExist) {
                state.answers = state.answers
                    .map((item: IAnswer) => item.id === action.payload.id ? action.payload : item)
            } else {
                state.answers = [...state.answers, action.payload]
            }

            setLCAnswer(state.answers)
        },
        setPlan: (state) => {
            state.isPlanExist = true
            localStorage.setItem('isPlanExist', 'true')
        }
    }
})

export const quizSliceReducer = quizSlice.reducer
export const {setAnswer, setPlan,} = quizSlice.actions