import React, {FC, ReactElement, useEffect, useMemo, useRef, useState} from 'react';
import {useTypedDispatch} from "../hooks/redux";
import {IActivity, IExercise} from "../types/exercise";
import {Liquid} from "@ant-design/plots";
import {setActivity} from "../redux/slice/exerciseSlice";
import {Grid} from "@mui/material";
import Button from "@mui/material/Button";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import MyAlert from "./UI/MyAlert";

interface IProps {
    exercise: IExercise,
}

const Timer: FC<IProps> = ({exercise}) => {
    const {itIsTime, counts, repeats} = exercise.timeType
    const dispatch = useTypedDispatch()
    const [progress, setProgress] = useState<number>(0)
    const [step, setStep] = useState(1)
    const [work, setWork] = useState({
        isWork: false, isAlertOpen: false, isFinished: false
    })
    const timer = useRef()

    const duration: number = useMemo(() => {
        if(itIsTime) return exercise.timeType.duration
        return Math.ceil(counts * 1.3)
    }, [])

    useEffect(() => {
        const activityData: string | null = localStorage.getItem('activity')
        if (activityData) {
            const allActivity: IActivity[] = JSON.parse(activityData)
            const activity: IActivity | undefined = allActivity.find((item) => item.exerciseName === exercise.name)

            if (!activity) return;

            const percent = Math.ceil(activity.progress * duration)
            setProgress(percent)
            if (percent === duration) {
                setWork({...work, isFinished: true})
            }
            setStep(activity.step)
        }
    }, [])

    const toggleWork = (isFinished: boolean = false): void => {
        if (timer.current) {
            clearTimeout(timer.current)
            timer.current = undefined
            setWork({...work, isFinished, isWork: false})
        } else {
            // @ts-ignore
            timer.current = setInterval(() => {
                setProgress(prev => {
                    const percent = prev / duration * 100
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

    const DemoLiquid = (): ReactElement => {
        const config = {
            percent: Number((progress / duration).toFixed(2)),
            outline: {border: 4, distance: 8,},
            wave: {length: 128,},
        };
        return <Liquid {...config} style={{width: 200, height: 200}}/>;
    };

    const finishExercise = () => {
        const percent: string = (progress / duration).toFixed(2)

        setStep(1)
        setProgress(0)
        clearTimeout(timer.current)
        timer.current = undefined
        setWork({isWork: false, isFinished: false, isAlertOpen: false})
        dispatch(setActivity({exerciseName: exercise.name, progress: +percent, step,}))
    }

    const resetExercise = (): void => {
        setProgress(0)
        setStep(1)
        clearTimeout(timer.current)
        timer.current = undefined
        setWork({isWork: false, isFinished: false, isAlertOpen: false})
        dispatch(setActivity({exerciseName: exercise.name, progress: 0, step: 1,}))
    }

    const nextStep = (): void => {
        if (step >= repeats) return;

        setStep(prev => prev + 1)
        setProgress(0)
        setWork({isWork: false, isFinished: false, isAlertOpen: false})
        dispatch(setActivity({exerciseName: exercise.name, progress: 0, step,}))
    }

    const prevStep = (): void => {
        if (step <= 1) return;

        setStep(prev => prev - 1)
        setProgress(0)
        setWork({isWork: false, isFinished: false, isAlertOpen: false})
        dispatch(setActivity({exerciseName: exercise.name, progress: 0, step: 1,}))
    }
    const closeAlert = (): void => {
        setWork({isWork: false, isAlertOpen: false, isFinished: true})
    }

    return (
        <div>
            <MyAlert text={'Вы выполнили упражнение!'} handleClose={closeAlert} isOpen={work.isAlertOpen}/>

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
                    {(step < repeats && work.isFinished) && <Button
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
                <Grid item>подход: {step} из {repeats}</Grid>
                <Grid item>всего: {duration}</Grid>
            </Grid>
            <br/>
            <DemoLiquid/>
            <br/>
            <br/>
            <div>{exercise.name}</div>
            <br/>
            <div>Для выполнения задания вам надо {
                exercise.timeType.itIsTime ? `продержаться ${duration} сек` : `выполнить ${counts} раз`
            }</div>
        </div>
    );
};

export default Timer;