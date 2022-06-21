import React from 'react';
import {Outlet} from "react-router-dom";
import Header from "../components/Header";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";

const Layout = () => {
    return (
        <div className={'app'}>
            <Header/>
            <Toolbar/>
            <Box component="main" sx={{p: 3}}>
                <Outlet/>
            </Box>
        </div>
    );
};

export default Layout;