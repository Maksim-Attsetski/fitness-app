import {IQuiz} from "../types/quiz";


export const quiz: IQuiz[] = [
    {
        id: 1, question: 'Какая у тебя цель?', variants: [
            {id: 1, text: 'Снизить вес', subText: '', answer: 'loseWeight'},
            {id: 1, text: 'Набрать мышечную массу', subText: '', answer: 'buildMuscle'},
            {id: 1, text: 'Поддержка формы', subText: '', answer: 'keepFit'},
        ]
    },
    {
        id: 2, question: 'Выбери свой уровень подготовки', variants: [
            {id: 2, text: 'Начинающий', subText: 'могу подтянуться до 5 раз', answer: 'beginner'},
            {id: 2, text: 'Средний', subText: 'могу подтянуться 5-10 раз', answer: 'middle'},
            {id: 2, text: 'Продвинутый', subText: 'могу подтянуться больше 15 раз', answer: 'advance'},
        ]
    },
    {
        id: 3, question: 'Какой у тебя уровень активности?', variants: [
            {id: 3, text: 'Сидячий', subText: '', answer: 'sedentary'},
            {id: 3, text: 'Низкий', subText: '', answer: 'lowActive'},
            {id: 3, text: 'Средний', subText: '', answer: 'middleActive'},
            {id: 3, text: 'Высокий', subText: '', answer: 'highActive'},
        ]
    },
    {
        id: 4, question: 'Сколько раз в неделю будем тренироваться?', variants: [
            {id: 4, text: 'Каждый день', subText: '', answer: 'sevenDays'},
            {id: 4, text: 'Три раза в неделю', subText: '', answer: 'threeDays'},
            {id: 4, text: 'Пять раз в неделю', subText: '', answer: 'fiveDays'},
        ]
    },
]
