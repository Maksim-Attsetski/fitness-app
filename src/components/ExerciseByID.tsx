import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import {IActivity, IExercise} from "../types/exercise";
import {exerciseList} from "../db";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {Alert, Grid, Snackbar} from "@mui/material";
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import {Liquid} from '@ant-design/plots';
import {useTypedDispatch} from "../hooks/redux";
import {setActivity} from "../redux/slice/exerciseSlice";

const ExerciseById: FC = () => {
    const dispatch = useTypedDispatch()
    const {id} = useParams()
    const [progress, setProgress] = useState<number>(0)
    const [isWork, setIsWork] = useState(false)
    const [isAlertOpen, setIsAlertOpen] = useState(false)
    const [isFinished, setIsFinished] = useState(false)
    const timer = useRef()

    const exercise: IExercise | undefined = useMemo(() => {
        return exerciseList.find((item: IExercise) => item.id === id)
    }, [id])

    useEffect(() => {
        if(!exercise) return
        const activityData: string | null = localStorage.getItem('activity')
        if(activityData) {
            const activity: IActivity[] = JSON.parse(activityData)
            const percent: IActivity | undefined = activity.find((item) => item.exerciseName === exercise.name)
            if(!percent) return;
            setProgress(Math.ceil(percent.progress * exercise?.timeType.duration))
        }
    }, [exercise])


    const toggleWork = () => {
        if (timer.current || isFinished) {
            clearTimeout(timer.current)
            timer.current = undefined
            setIsWork(false)
        } else {
            // @ts-ignore
            timer.current = setInterval(() => {
                if (!exercise) return

                setProgress(prev => {
                    const percent = prev / exercise?.timeType?.duration * 100
                    if (+percent === 100) {
                        setIsFinished(true)
                        setIsAlertOpen(true)
                        setIsWork(false)
                        toggleWork()
                        return prev
                    } else {
                        setIsWork(true)
                        return prev + 1
                    }
                });
            }, 1000)
        }
    }

    const DemoLiquid = () => {
        // @ts-ignore
        const percent: string = (progress / exercise?.timeType.duration).toFixed(2)
        const config = {
            percent: +percent,
            outline: {
                border: 4,
                distance: 8,
            },
            wave: {
                length: 128,
            },
        };
        return <Liquid {...config} style={{width: 200, height: 200}}/>;
    };

    const finishExercise = () => {
        if(!exercise) return
        const percent: string = (progress / exercise?.timeType.duration).toFixed(2)

        dispatch(setActivity({
            exerciseName: exercise.name,
            progress: +percent,
        }))
    }

    const resetExercise = () => {
        setProgress(0)
        setIsWork(false)
        setIsFinished(false)

        dispatch(setActivity({
            exerciseName: exercise.name,
            progress: 0,
        }))
    }

    return (
        exercise ? <div>
                <Snackbar open={isAlertOpen} autoHideDuration={2000} onClose={() => setIsAlertOpen(false)}>
                    <Alert onClose={() => setIsAlertOpen(false)} severity="success" sx={{width: '100%'}}>
                        Вы выполнили упражнение!
                    </Alert>
                </Snackbar>

                <Box sx={{m: 2}}>
                    <Button onClick={toggleWork} variant="contained">
                        {isWork ? <PauseCircleOutlineIcon/> : <PlayCircleFilledWhiteIcon/>}
                    </Button>

                    {progress > 0 && <Button onClick={finishExercise}
                                             sx={{ml: 3, mr: 3}} variant="contained">Закончить</Button>}

                    {progress > 0 && <Button onClick={resetExercise} variant="contained">Заново</Button>}
                </Box>

                <Grid container columnSpacing={2}>
                    <Grid item>сек: {progress % 60}</Grid>
                    <Grid item>мин: {Math.floor(progress / 60)}</Grid>
                    <Grid item>всего: {exercise?.timeType.duration}</Grid>
                </Grid>
                <br/>
                <DemoLiquid/>
                <br/>
                <br/>
                <br/>
                {id}
                {exercise && <div>{exercise.name}</div>}
            </div>
            : <div>Загрузка...</div>
    );
};

export default ExerciseById;