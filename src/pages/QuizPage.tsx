import React, {FC} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import Man from '../assets/img/man.png';
import Woman from '../assets/img/woman.png';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import {routeNames} from "../routes/routeNames";
import {Link, useNavigate} from "react-router-dom";
import {NextBtn, PrevBtn} from '../components/UI/QuizBtns';

const QuizPage: FC = () => {
    const navigate = useNavigate()

    const saveGender = (gender: string): void => {
        localStorage.setItem('gender', gender)
        navigate(routeNames.QUIZ + '/1')
    }

    const swiperProps = {
        centeredSlides: true,
        initialSlide: 1,
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 0,
            },
            900: {
                slidesPerView: 3,
                spaceBetween: 100,
            },
        }
    }

    return (
        <div>
            <Swiper {...swiperProps}
            >
                <SwiperSlide className={'slide-quiz-box'} style={{display: 'flex', justifyContent: 'center'}}>
                    {({isActive}) => (
                        <Box sx={{minHeight: '80vh'}}>
                            <div><img src={Man} alt={'man'}/></div>
                            <Grid container spacing={2} wrap={'wrap'} alignItems={'center'} sx={{mt: 1}}>
                                <Grid item>
                                    <span>Парень?</span>
                                    <Link style={{color: '#1976d2'}} to={routeNames.QUIZ + '/1'}>
                                        <Button onClick={() => saveGender('male')}>Да</Button>
                                    </Link>
                                </Grid>
                                <Grid item>{isActive && <NextBtn/>}</Grid>
                            </Grid>
                        </Box>
                    )}
                </SwiperSlide>
                <SwiperSlide style={{display: 'flex', justifyContent: 'center'}}>
                    {({isActive}) => (
                        <Grid container style={{fontSize: 50, width: 300, minHeight: '80vh'}}
                              alignItems={'center'} direction={'column'} rowSpacing={2}>
                            <Grid item sx={{textAlign: 'center'}}>Какого ты пола?</Grid>
                            <Grid container spacing={2} justifyContent={'center'}>
                                <Grid item>{isActive && <PrevBtn/>}</Grid>
                                <Grid item>{isActive && <NextBtn/>}</Grid>
                            </Grid>
                            <Grid container spacing={2} justifyContent={'center'}>
                                <Grid item>{isActive && <span style={{fontSize: 18}}>&#10229; М</span>}</Grid>
                                <Grid item>{isActive && <span style={{fontSize: 18}}>Ж &#10230;</span>}</Grid>
                            </Grid>
                        </Grid>
                    )}
                </SwiperSlide>
                <SwiperSlide className={'slide-quiz-box'} style={{display: 'flex', justifyContent: 'center'}}>
                    {({isActive}) => (
                        <Box sx={{minHeight: '80vh'}}>
                            <div><img src={Woman} alt={'woman'}/></div>
                            <Grid container spacing={2} wrap={'wrap'} alignItems={'center'} sx={{mt: 1}}>
                                <Grid item>
                                    <span>Девушка?</span>
                                    <Link style={{color: '#1976d2'}} to={routeNames.QUIZ + '/1'}>
                                        <Button onClick={() => saveGender('female')}>Да</Button>
                                    </Link>
                                </Grid>

                                <Grid item>{isActive && <PrevBtn/>}</Grid>
                            </Grid>
                        </Box>
                    )}
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default QuizPage;