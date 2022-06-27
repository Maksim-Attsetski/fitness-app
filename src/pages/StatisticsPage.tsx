import Grid from '@mui/material/Grid';
import React, {FC, useEffect, useMemo} from 'react';
import {useTypedSelector} from '../hooks/redux';
import {IActivity, IExercise} from "../types/exercise";
import {checkLevel} from "../helpers/checkLevel";
import {exerciseList} from "../db/lists";
import {Pie} from '@ant-design/plots';
import {checkGender} from "../helpers/checkGender";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

const StatisticsPage: FC = () => {
    const {answers, isPlanExist} = useTypedSelector(state => state.quiz)
    const {activity} = useTypedSelector(state => state.exercises)

    const exercises: IExercise[] = useMemo(() => {
        const genderList: IExercise[] = checkGender(exerciseList)
        return checkLevel(genderList)
    }, [])
    const myActivity: IActivity[] = useMemo(() => {
        return activity.map((item: IActivity) => {
            return {...item, progress: item.progress * 100}
        })
    }, [])
    useEffect(() => {
        console.log(exercises)
        console.log(activity, 'activity')
    }, [exercises])


    const DemoPie = () => {
        const data = myActivity
        const config = {
            appendPadding: 10,
            data,
            angleField: 'progress',
            colorField: 'exerciseName',
            radius: 0.8,
            label: {
                type: 'outer',
                content: '{name} {percentage}',
            },
            interactions: [
                {type: 'pie-legend-active',},
                {type: 'element-active',},
            ],
        };
        return <Pie {...config} />;
    };


    return (
        <div>
            {isPlanExist && <div>
                <Box sx={{mb: 2}}>Твой план</Box>

                <Grid container spacing={2}>
                    {answers.map((item) =>
                        <Grid item key={item.id} sx={{mb: 2}}>
                            <div>{item.answer}</div>
                        </Grid>
                    )}
                </Grid>
                <Divider sx={{m: 2}}/>
            </div>}

            <Box sx={{mb: 2}}>Твоя активность</Box>
            <DemoPie/>
        </div>
    );
};

export default StatisticsPage;