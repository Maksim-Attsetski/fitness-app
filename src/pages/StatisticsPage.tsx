import Grid from '@mui/material/Grid';
import React, {FC, useEffect, useMemo} from 'react';
import {useTypedSelector} from '../hooks/redux';
import {IExercise} from "../types/exercise";
import {checkLevel} from "../helpers/checkLevel";
import {exerciseList} from "../db/lists";
import {checkGender} from "../helpers/checkGender";

const StatisticsPage: FC = () => {
    const {answers} = useTypedSelector(state => state.quiz)

    const exercises: IExercise[] = useMemo(() => {
        const genderList: IExercise[] = checkGender(exerciseList)
        return checkLevel(genderList)
    }, [])

    useEffect(() => {
        console.log(exercises)
    }, [exercises])

    return (
        <div>
            статистика

            <Grid container spacing={2}>
                {answers.map((item) =>
                    <Grid item key={item.id} style={{marginBottom: 20}}>
                        <div>{item.id}</div>
                        <div>{item.answer}</div>
                    </Grid>
                )}
            </Grid>
        </div>
    );
};

export default StatisticsPage;