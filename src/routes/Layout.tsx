import React from 'react';
import {Outlet} from "react-router-dom";
import Header from "../components/Header";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import {Container} from "@mui/material";

const Layout = () => {
    return (
        <Container >
            <Header/>
            <Toolbar/>
            <Box component="main" sx={{p: 3}}>
                <Outlet/>
            </Box>
        </Container>
    );
};

export default Layout;