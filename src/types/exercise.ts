
export interface IExercise {
    id: string, // чтоб можно было перейти на опред упр
    name: ExerciseTypes, // название упр
    description: string, //описание упр
    muscles: string[], // на какие мышцы это упр
    timeType: IExerciseDuration, // кол-во секунд, которое надо на выполнение
}

export interface IExerciseDuration {
    itIsTime: boolean,
    duration: number,
    counts: number,
    repeats: number,
}

export interface IMuscles {
    name: MuscleTypes, // название мышцы
    recommended: ExerciseTypes[] // рекомендуемые управжнения к этой мышце
}
export interface IActivity {
    exerciseName: string, // названия упр, которое ты сделал
    progress: number, // насколько оно сделано
    step: number, // на каком подходе остановились
}

export type MuscleTypes = 'Грудь' | 'Пресс' | 'Бицепсы'
    | 'Бедра' | 'Ягодицы' | 'Икры'
    | 'Выносливость'

export type ExerciseTypes = 'Жим лёжа' | 'Планка' | 'Скручивания' | 'Молотковые сгибания на бицепс'
| 'Прыжки (звезда)' | 'Скалолаз' | 'Поднятие ног'