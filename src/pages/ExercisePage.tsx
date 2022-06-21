import Button from '@mui/material/Button';
import React, {FC, useRef, useState} from 'react';
import Box from "@mui/material/Box";
import {CircularProgress, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import {exerciseList} from "../db";
import {IExercise} from "../types/exercise";
import Exercise from "../components/Exercise";


const ExercisePage: FC = () => {
    const [progress, setProgress] = useState(0)
    const [isWork, setIsWork] = useState(false)
    const timer = useRef()

    const toggleWork = () => {
        if (timer.current) {
            clearTimeout(timer.current)
            timer.current = undefined
        } else {
            // @ts-ignore
            timer.current = setInterval(() => {
                setProgress(prev => prev + 1);
            }, 1000)
        }
        setIsWork(!isWork)
    }

    return (
        <div>
            <Box sx={{m: 2}}>
                <Button onClick={toggleWork} variant="contained"
                >{isWork ? 'stop' : 'start'}</Button>
            </Box>

            <Box sx={{position: 'relative'}}>
                <CircularProgress variant="determinate" value={progress} size={90} sx={{color: '#000'}}/>
                <Box
                    sx={{
                        position: 'absolute',
                        top: 25, left: 25
                    }}
                >
                    <Typography
                        variant="caption"
                        component="div"
                        color="text.secondary"
                    >
                        sec: {progress % 60} <br/>
                        min: {Math.floor(progress / 60)}
                    </Typography>
                </Box>
            </Box>

            <Grid container spacing={3}>
                {exerciseList.map((exercise: IExercise) =>
                    <Exercise exercise={exercise} key={exercise.id} />
                )}
            </Grid>
        </div>
    );
};

export default ExercisePage;