import React, {FC} from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const HomePage: FC = () => {
    return (
        <Box>
            <Typography variant={'h4'} sx={{textAlign: 'center'}}>
                Добро пожаловать в моё фитнесс приложение
            </Typography>
            <Typography variant={'body1'} sx={{textAlign: 'center'}}>
                Здесь вы можете найти интересные упражнения на разные группы мышц
            </Typography>
        </Box>
    );
};

export default HomePage;