import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Logo from "./Logo";
import SearchInput from "./SearchInput";
import {routeNames} from "../routes/routeNames";
import {NavLink} from "react-router-dom";

interface Props {
    window?: () => Window;
}

const drawerWidth = 240;
const navItems = [
    {text: 'О нас', to: routeNames.ABOUT},
    {text: 'Контакты', to: routeNames.CONTACTS},
    {text: 'Упражнения', to: routeNames.EXERCISES},
    {text: 'Статистика', to: routeNames.STATISTICS},
];

const Header = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{textAlign: 'center'}} className={'burger'}>
            <Typography variant="h6" sx={{my: 2}}>
                <Logo/>
            </Typography>
            <Divider/>
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.to} disablePadding>
                        <ListItemButton sx={{textAlign: 'center'}}>
                            <NavLink to={item.to}>
                                <ListItemText primary={item.text}/>
                            </NavLink>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box component="header" sx={{display: 'flex'}}>
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{mr: 2, display: {md: 'none'}}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{flexGrow: 1, display: {xs: 'none', md: 'block'}}}
                    >
                        <Logo/>
                    </Typography>

                    <SearchInput/>

                    <Box sx={{display: {xs: 'none', md: 'flex'}, gap: 2, ml: 3}}>
                        {navItems.map((item) => (
                            <NavLink to={item.to} key={item.to}>
                                {item.text}
                            </NavLink>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{keepMounted: true,}}
                    sx={{
                        display: {xs: 'block', sm: 'none'},
                        '& .MuiDrawer-paper': {width: drawerWidth},
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
}

export default Header;