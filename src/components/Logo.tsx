import React, {FC} from 'react';
import {routeNames} from "../routes/routeNames";
import {Avatar} from "@mui/material";
import {fitnessLogoURL} from "../assets/img/url";
import {Link} from "react-router-dom";

const Logo: FC = () => {
    return (
        <Link to={routeNames.HOME}>
            <Avatar alt={'logo'} src={fitnessLogoURL} />
        </Link>
    );
};

export default Logo;