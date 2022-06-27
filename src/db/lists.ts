import {IExercise, IMuscles} from "../types/exercise";
import {
    benchPress,
    hummerBends,
    jumpingStart,
    legsRaises,
    mountainClimber,
    plank,
    twisting
} from "./exercises";

export const musclesList: IMuscles[] = [
    {name: 'Бицепсы', recommended: ['Жим лёжа', 'Молотковые сгибания на бицепс']},
    {name: 'Грудь', recommended: ['Жим лёжа',]},
    {name: 'Пресс', recommended: ['Планка', 'Скручивания']},
]

export const exerciseList: IExercise[] = [
    {...hummerBends},
    {...plank},
    {...twisting},
    {...benchPress},
    {...jumpingStart},
    {...mountainClimber},
    {...legsRaises},
]
