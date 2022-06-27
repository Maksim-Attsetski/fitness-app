
export interface IQuestions {
    id: number,
    text: string,
    subText: string,
    answer: answers,
}

export type answers = 'loseWeight' | 'buildMuscle' | 'keepFit'
    | 'beginner' | 'middle' | 'advance'
    | 'sedentary' | 'lowActive' | 'middleActive' | 'highActive'
    | 'sevenDays' | 'threeDays' | 'fiveDays'
    | ''

export interface IQuiz {
    id: number,
    question: string,
    variants: IQuestions[]
}

export interface IAnswer {
    id: number,
    answer: answers,
}