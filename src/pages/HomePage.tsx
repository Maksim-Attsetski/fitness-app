import React, {FC} from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useTypedSelector} from "../hooks/redux";
import Divider from "@mui/material/Divider";
import {Link} from "react-router-dom";
import {routeNames} from "../routes/routeNames";
import Button from "@mui/material/Button";

const HomePage: FC = () => {
    const {isPlanExist} = useTypedSelector(state => state.quiz)
    return (
        <Box>
            <Typography variant={'h4'} sx={{textAlign: 'center'}}>
                Добро пожаловать в моё фитнесс приложение
            </Typography>
            <Typography variant={'body1'} sx={{textAlign: 'center'}}>
                Здесь вы можете найти интересные упражнения на разные группы мышц
            </Typography>
                <Divider sx={{m: 1}} />
            {!isPlanExist && <div>
                <Typography variant={'body1'} sx={{textAlign: 'center'}}>
                    У тебя нет личного плана :(
                </Typography>
                <Typography variant={'body1'} sx={{textAlign: 'center'}}>
                    Давай сделаем его вместе <Link style={{color: '#1976d2'}} to={routeNames.QUIZ}>тыкай</Link>
                </Typography>
            </div>}
            {isPlanExist && <div>
                <Typography variant={'body1'} sx={{textAlign: 'center'}}>
                    <Button onClick={() => localStorage.removeItem('isPlanExist')}>remove plan</Button>
                </Typography>
            </div>}
        </Box>
    );
};

export default HomePage;