import Button from '@mui/material/Button';
import React, {FC, useRef, useState} from 'react';
import Box from "@mui/material/Box";
import {CircularProgress} from "@mui/material";
import Typography from "@mui/material/Typography";


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
            <Box sx={{m: 2}}></Box>
            <Button onClick={toggleWork} variant="contained"
            >{isWork ? 'stop' : 'start'}</Button>

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
        </div>
    );
};

export default ExercisePage;