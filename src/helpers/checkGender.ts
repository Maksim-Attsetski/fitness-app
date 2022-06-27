import {IExercise} from "../types/exercise";


export const checkGender = (list: IExercise[], gender: string = ''): IExercise[] => {
    let genderData: string | null = null

    if (gender) {
        genderData = gender
    } else {
        genderData = localStorage.getItem('gender')
    }

    if (genderData) {

        return list.map((item: IExercise) => {
            if (genderData === 'male') return item

            else return {
                ...item, timeType: {
                    ...item.timeType, repeats: Math.ceil(item.timeType.repeats * 0.6)
                }
            }
        })
    }

    return list
}