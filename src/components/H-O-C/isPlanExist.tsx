import React, {FC, ReactElement, ReactNode} from 'react';
import {Navigate, useLocation} from "react-router-dom";

interface IProps {
    children: ReactElement | ReactNode
}

const IsPlanExist: FC<IProps> = ({children}) => {
    const location = useLocation()
    const auth = false

    if (auth) {
        return <div>{children}</div>
    } else {
        Navigate({to: '/quiz', replace: true, state: {from: location.pathname}})
    }

    return <div></div>
};

export default IsPlanExist;