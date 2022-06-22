import React, {FC} from 'react';
import {Grid} from "@mui/material";
import {exerciseList} from "../db";
import {IExercise} from "../types/exercise";
import Exercise from "../components/Exercise";


const ExercisePage: FC = () => {

    return (
        <div>
            <Grid container spacing={3}>
                {exerciseList.map((exercise: IExercise) =>
                    <Exercise exercise={exercise} key={exercise.id}/>
                )}
            </Grid>
        </div>
    );
};

export default ExercisePage;