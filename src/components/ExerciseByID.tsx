import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import {IActivity, IExercise} from "../types/exercise";
import {exerciseList} from "../db/lists";
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
    const [step, setStep] = useState(1)
    const [work, setWork] = useState({
        isWork: false, isAlertOpen: false, isFinished: false
    })
    const timer = useRef()

    const exercise: IExercise | undefined = useMemo(() => {
        return exerciseList.find((item: IExercise) => item.id === id)
    }, [id])

    useEffect(() => {
        if (!exercise) return
        const activityData: string | null = localStorage.getItem('activity')
        if (activityData) {
            const allActivity: IActivity[] = JSON.parse(activityData)
            const activity: IActivity | undefined = allActivity.find((item) => item.exerciseName === exercise.name)

            if (!activity) return;

            const percent = Math.ceil(activity.progress * exercise?.timeType.duration)
            setProgress(percent)
            if (percent === exercise?.timeType.duration) {
                setWork({...work, isFinished: true})
            }
            setStep(activity.step)
        }
    }, [exercise])

    const toggleWork = (isFinished: boolean = false) => {
        if (timer.current) {
            clearTimeout(timer.current)
            timer.current = undefined
            setWork({...work, isFinished, isWork: false})
        } else {
            // @ts-ignore
            timer.current = setInterval(() => {
                if (!exercise) return

                setProgress(prev => {
                    const percent = prev / exercise?.timeType?.duration * 100
                    if (+percent === 100) {
                        setWork({isWork: false, isAlertOpen: true, isFinished: true})
                        toggleWork(true)
                        return prev
                    } else {
                        setWork({...work, isWork: true})
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
            outline: {border: 4, distance: 8,},
            wave: {length: 128,},
        };
        return <Liquid {...config} style={{width: 200, height: 200}}/>;
    };

    const finishExercise = () => {
        if (!exercise) return
        const percent: string = (progress / exercise?.timeType.duration).toFixed(2)

        setStep(1)
        setProgress(0)
        clearTimeout(timer.current)
        timer.current = undefined
        setWork({isWork: false, isFinished: false, isAlertOpen: false})
        dispatch(setActivity({exerciseName: exercise.name, progress: +percent, step,}))
    }

    const resetExercise = (): void => {
        if (!exercise) return

        setProgress(0)
        setStep(1)
        clearTimeout(timer.current)
        timer.current = undefined
        setWork({isWork: false, isFinished: false, isAlertOpen: false})
        dispatch(setActivity({exerciseName: exercise.name, progress: 0, step: 1,}))
    }

    const nextStep = (): void => {
        if (!exercise) return
        if (step >= exercise.timeType.repeats) return;
        console.log('next step')

        setStep(prev => prev + 1)
        setProgress(0)
        setWork({isWork: false, isFinished: false, isAlertOpen: false})
        dispatch(setActivity({exerciseName: exercise.name, progress: 0, step,}))
    }

    const prevStep = (): void => {
        if (!exercise) return
        if (step <= 1) return;
        console.log('prev step')
        setStep(prev => prev - 1)
        setProgress(0)
        setWork({isWork: false, isFinished: false, isAlertOpen: false})
        dispatch(setActivity({exerciseName: exercise.name, progress: 0, step: 1,}))
    }

    return (
        exercise ? <div>
                <Snackbar open={work.isAlertOpen} autoHideDuration={2000}
                          onClose={() => setWork({isWork: false, isAlertOpen: false, isFinished: true})}>
                    <Alert onClose={() => setWork({isWork: false, isAlertOpen: false, isFinished: true})}
                           severity="success"
                           sx={{width: '100%'}}>
                        Вы выполнили упражнение!
                    </Alert>
                </Snackbar>

                <Grid container sx={{mt: 2, mb: 2}} spacing={3}>
                    <Grid item>
                        <Button onClick={() => toggleWork()} disabled={work.isFinished} variant="contained">
                            {work.isWork ? <PauseCircleOutlineIcon/> : <PlayCircleFilledWhiteIcon/>}
                        </Button>
                    </Grid>

                    <Grid item>
                        {(progress > 0) &&
                            <Button onClick={finishExercise} variant="contained">Сохранить</Button>}
                    </Grid>

                    <Grid item>
                        {progress > 0 && <Button onClick={resetExercise} variant="contained">Заново</Button>}
                    </Grid>

                    <Grid item>
                        {(step < exercise.timeType.repeats && work.isFinished) && <Button
                            onClick={nextStep} variant="contained">Следующий подход</Button>}
                    </Grid>

                    <Grid item>
                        {(step > 1) && <Button
                            onClick={prevStep} variant="contained">Вернуться на прошлый подход</Button>}
                    </Grid>
                </Grid>

                <Grid container columnSpacing={2}>
                    <Grid item>сек: {progress % 60}</Grid>
                    <Grid item>мин: {Math.floor(progress / 60)}</Grid>
                    <Grid item>подход: {step} из {exercise.timeType.repeats}</Grid>
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