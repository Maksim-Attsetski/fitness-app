import React, {FC, useMemo} from 'react';
import {useParams} from "react-router-dom";
import {IExercise} from "../types/exercise";
import Timer from "./Timer";
import {useTypedSelector} from "../hooks/redux";

const ExerciseById: FC = () => {
    const {id} = useParams()
    const {exercises} = useTypedSelector(state => state.exercises)

    const exercise: IExercise = useMemo(() => {
        return exercises.find((item: IExercise) => item.id === id) || {} as IExercise
    }, [id])

    return (
        <Timer exercise={exercise}/>
    )
};

export default ExerciseById;