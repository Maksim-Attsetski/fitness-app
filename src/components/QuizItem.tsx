import React, {FC, useMemo, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {answers, IAnswer, IQuiz} from "../types/quiz";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {useTypedDispatch} from "../hooks/redux";
import {setAnswer, setPlan} from "../redux/slice/quizSlice";
import {routeNames} from "../routes/routeNames";
import {quiz} from "../db/quiz";

const QuizItem: FC = () => {
    const dispatch = useTypedDispatch()
    const {step} = useParams()
    const navigate = useNavigate()
    const [selectValue, setSelectValue] = useState<answers>('')

    const quizItem: IQuiz = useMemo(() => {
        if (!step) return {} as IQuiz
        const item = quiz.find((item: IQuiz) => item.id === +step)
        return item ? item : {} as IQuiz
    }, [step])

    const maxStep: number = useMemo(() => {
        let max = 0
        quiz.forEach(({id}) => {
            if (id) max = id
        })
        return max
    }, [])

    const handleQuestionClick = (maxStep: number, step: number): void => {
        const answer: IAnswer = {id: quizItem.id, answer: selectValue,}
        dispatch(setAnswer(answer))

        setSelectValue('')

        if (maxStep === step) {
            dispatch(setPlan())
            navigate(routeNames.HOME)
        } else {
            navigate(`${routeNames.QUIZ}/${step + 1}`)
        }
    }

    return (
        <div>
            {(step && quizItem)
                ? <div>
                    <div>quiz item, step: {step} from {maxStep}</div>

                    <Divider sx={{mt: 1, mb: 1}}/>

                    <div>{quizItem.question}</div>

                    <Divider sx={{mt: 1, mb: 1}}/>
                    {quizItem.variants.map(({text, subText, answer}, index) =>
                        <Box key={index} sx={{
                            mb: 1, border: selectValue === answer ? '2px solid #1976d2' : '2px solid #fff',
                            p: 2, borderRadius: 20, color: selectValue === answer ? '#1976d2' : '#000',
                            backgroundColor: selectValue === answer ? 'rgb(246,243,243)' : '#fff',
                            fontSize: 'calc(3vmin + 7px)', letterSpacing: 1,
                            width: 'clamp(250px, 70vw, 450px)'
                        }} onClick={() => setSelectValue(answer)}>
                            <Box>{text}</Box>
                            {subText && <Box className={'under-text'}>{subText}</Box>}
                        </Box>
                    )}

                    {selectValue && <div>
                        <Button variant={'contained'} onClick={() => handleQuestionClick(maxStep, +step)}>
                            {maxStep === +step ? 'Закончить' : 'Дальше'}
                        </Button>
                    </div>}
                </div>
                : <div><strong>404</strong> not found</div>}
        </div>
    );
};

export default QuizItem;