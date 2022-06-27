import {IExercise} from "../types/exercise";
import {IAnswer} from "../types/quiz";


export const checkLevel = (list: IExercise[], myAnswer: string = ''): IExercise[] => {
    let answersData: string | null = null

    if (myAnswer) {
        answersData = myAnswer
    } else {
        answersData = localStorage.getItem('answers')
    }

    if (answersData) {
        const answers: IAnswer[] = JSON.parse(answersData)
        const level: string = answers[1].answer

        return list.map((item: IExercise) => {
            if (level === 'beginner') return {
                ...item, timeType: {
                    ...item.timeType,
                    duration: Math.ceil(item.timeType.duration * 0.65),
                    counts: Math.ceil(item.timeType.counts * 0.65)
                }
            }

            else if (level === 'middle') return item

            else if (level === 'advance') return {
                ...item, timeType: {
                    ...item.timeType,
                    duration: Math.ceil(item.timeType.duration * 1.4),
                    counts: Math.ceil(item.timeType.counts * 1.4)
                }
            }
            return item
        })
    } else {
        return list
    }
}