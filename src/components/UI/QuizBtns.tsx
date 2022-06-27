import React, {FC} from "react";
import {useSwiper} from "swiper/react";
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";


export const NextBtn: FC = () => {
    const swiper = useSwiper()
    return (
        <Button variant='outlined' onClick={() => swiper.slideNext()}>
            <ArrowForwardIosIcon/>
        </Button>
    )
}
export const PrevBtn: FC = () => {
    const swiper = useSwiper()
    return (
        <Button variant='outlined' onClick={() => swiper.slidePrev()}>
            <ArrowBackIosNewIcon/>
        </Button>
    )
}
