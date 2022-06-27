import React, {FC, useEffect, useMemo, useState} from 'react';
import {Grid} from "@mui/material";
import {IExercise} from "../types/exercise";
import Exercise from "../components/Exercise";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {useTypedDispatch, useTypedSelector} from "../hooks/redux";
import Divider from "@mui/material/Divider";
import {setExercises} from "../redux/slice/exerciseSlice";


const ExercisePage: FC = () => {
    const {favoriteExercises, exercises} = useTypedSelector(state => state.exercises)
    const [isFavorite, setIsFavorite] = useState<boolean>(false)

    const myExercises: IExercise[] = useMemo(() => {
        return isFavorite ? favoriteExercises : exercises
    }, [isFavorite])

    return (
        <div>
            <Box>
                <Button variant={'outlined'} onClick={() => setIsFavorite(!isFavorite)}
                >{isFavorite ? 'Избранные' : 'Все'} упражнения</Button>
            </Box>

            <Divider sx={{mt: 2.5, mb: 2.5}}/>

            <Grid container spacing={3}>
                {myExercises.map((exercise: IExercise) =>
                    <Exercise exercise={exercise} key={exercise.id}/>
                )}
            </Grid>
        </div>
    );
};

export default ExercisePage;