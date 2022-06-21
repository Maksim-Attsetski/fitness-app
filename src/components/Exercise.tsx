import React, {FC, useMemo, useState} from 'react';
import {IExercise} from "../types/exercise";
import {Card, CardActions, CardContent, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {routeNames} from "../routes/routeNames";
import {Link} from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useTypedDispatch, useTypedSelector} from "../hooks/redux";
import {toggleFavorite} from "../redux/slice/exerciseSlice";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import MyAccordion from "./UI/MyAccordion";
import Divider from "@mui/material/Divider";

interface IProps {
    exercise: IExercise
}

const Exercise: FC<IProps> = ({exercise}) => {
    const dispatch = useTypedDispatch()
    const {description, name, timeType, id, muscles} = exercise
    const {times, duration, counts, repeats} = timeType
    const {favoriteExercises} = useTypedSelector(state => state.exercises)
    const inFavorite: boolean = useMemo(() => favoriteExercises.some((item: string) => item === id), [favoriteExercises])
    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        console.log(isExpanded)
        setExpanded(isExpanded ? panel : false);
    };

    const accordionItems = [
        {title: 'Описание', text: description},
        {title: 'Подходы', text: repeats},
        {title: 'Повторения', text: times ? `Длительность: ${duration} сек` : `Повторы: ${counts} раз`},
        {title: 'Мышцы', text: muscles},
    ]


    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card>
                <CardContent>
                    <Typography variant='h5'>{name}</Typography>
                    <Divider sx={{m: 2}}/>
                    {accordionItems.map(({title, text}, index) =>
                        <MyAccordion
                            expanded={expanded}
                            handleChange={handleChange}
                            index={index} title={title} text={text} key={index}/>
                    )}
                </CardContent>
                <CardActions>
                    <Button size="small">
                        <Link className={'exercise__link'} to={routeNames.HOME}>Перейти</Link>
                    </Button>
                    <Button size="small" onClick={() => dispatch(toggleFavorite(id))}>
                        {inFavorite ? 'В избранном' : 'В избранное'}
                        {inFavorite
                            ? <FavoriteIcon sx={{ml: 2}}/>
                            : <FavoriteBorderOutlinedIcon sx={{ml: 2}}/>}
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default Exercise;