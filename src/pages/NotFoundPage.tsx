import { Box } from '@mui/material';
import React from 'react';

const NotFoundPage = () => {
    return (
        <div className={'page'}>
            <Box sx={{fontSize: 40}}>
                <strong>404</strong> <span>page is not founded</span>
            </Box>
        </div>
    );
};

export default NotFoundPage;