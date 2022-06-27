import React, {FC} from 'react';
import {Alert, Snackbar} from "@mui/material";

interface IProps {
    text: string,
    isOpen: boolean,
    handleClose: () => void
}

const MyAlert: FC<IProps> = ({text, isOpen, handleClose}) => {
    return (
        <Snackbar open={isOpen} autoHideDuration={2000}
                  onClose={() => handleClose}>
            <Alert onClose={() => handleClose}
                   severity="success" sx={{width: '100%'}}>
                {text}
            </Alert>
        </Snackbar>
    );
};

export default MyAlert;