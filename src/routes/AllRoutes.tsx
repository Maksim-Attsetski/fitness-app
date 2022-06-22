import React from 'react';
import {Route, Routes} from "react-router-dom";
import Layout from "./Layout";
import {routeNames} from "./routeNames";
import NotFoundPage from "../pages/NotFoundPage";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactsPage";
import ExercisePage from "../pages/ExercisePage";
import StatisticsPage from "../pages/StatisticsPage";
import ExerciseByID from "../components/ExerciseByID";

const AllRoutes = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Layout/>}>
                <Route path={routeNames.HOME} element={<HomePage />} />
                <Route path={routeNames.NOT_FOUNDED} element={<NotFoundPage/>}/>
                <Route path={routeNames.ABOUT} element={<AboutPage/>}/>
                <Route path={routeNames.CONTACTS} element={<ContactPage/>}/>
                <Route path={routeNames.EXERCISES} element={<ExercisePage/>}/>
                <Route path={`${routeNames.EXERCISES}/:id`} element={<ExerciseByID/>}/>
                <Route path={routeNames.STATISTICS} element={<StatisticsPage/>}/>
            </Route>
        </Routes>
    );
};

export default AllRoutes;