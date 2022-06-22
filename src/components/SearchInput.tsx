import React, {ChangeEvent, FC, useEffect, useState} from "react";
import {alpha, styled} from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import {IExercise} from "../types/exercise";
import {exerciseList} from "../db";
import {useDebounce} from "../hooks/useDebounce";
import {routeNames} from "../routes/routeNames";
import {Link, useLocation} from "react-router-dom";
import {Grid} from "@mui/material";
import Button from "@mui/material/Button";

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const SearchArrays = styled('div')(({theme}) => ({
    padding: '20px 10px 5px 10px', minHeight: 100, width: 300, overflow: 'hidden',
    position: 'absolute', top: '100%', left: 0, display: 'flex', gap: 10, flexWrap: 'wrap',
    backgroundColor: '#1976d2', borderRadius: 15, pointerEvents: 'all',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '50vw',
        '&:focus': {
            width: '60vw',
        },
        [theme.breakpoints.up('sm')]: {
            width: '20ch',
            '&:focus': {
                width: '30ch',
            },
        },
    },
}));

const SearchInput: FC = () => {
    const [searchValue, setSearchValue] = useState<string>('')
    const [exercises, setExercises] = useState<IExercise[]>([])
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const debounce = useDebounce(filteredExercises, 700)
    const location = useLocation()
    const {pathname} = location

    function filteredExercises(value: string): void {
        const newExercises: IExercise[] = exerciseList
            .filter((item) => item.name.toLowerCase().includes(value.toLowerCase()))

        if (newExercises)

            setExercises([...newExercises])
    }

    useEffect(() => {
        setIsOpen(false)
        setSearchValue('')
    }, [pathname])

    const searchExercise = (event: ChangeEvent<HTMLInputElement>): void => {
        setSearchValue(event.target.value)
        debounce(event.target.value)
    }

    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon/>
                {isOpen && <Grid container justifyContent="space-between">
                    <SearchArrays>
                        {exercises.map(({id, name}) => (
                            <Grid container columnSpacing={1} key={id}>
                                <Grid item>{name}</Grid>
                                <Grid item>
                                    <Link
                                        to={`${routeNames.EXERCISES}/${id}`}
                                        onClick={() => setIsOpen(false)}>Открыть</Link>
                                </Grid>
                            </Grid>))}
                        <Grid container columnSpacing={2} alignItems={'center'}>
                            <Grid item>
                                <Button sx={{color: '#fff'}}
                                        onClick={() => setIsOpen(false)}>X</Button>
                            </Grid>
                            <Grid item sx={{height: 25}}>
                                <Link to={routeNames.EXERCISES}
                                      onClick={() => setIsOpen(false)}
                                >Все упражнения</Link>
                            </Grid>
                        </Grid>
                    </SearchArrays>
                </Grid>}
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Поиск…"
                inputProps={{'aria-label': 'search'}}
                value={searchValue}
                onChange={searchExercise}
                onFocus={() => setIsOpen(true)}
            />
        </Search>
    );
};

export default SearchInput;