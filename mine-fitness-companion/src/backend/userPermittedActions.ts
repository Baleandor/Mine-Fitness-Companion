
import dayjs from "dayjs"
import { exerciseTypesByIdMap } from "./mockData/exerciseType"
import { measurementEventByIdMap } from "./mockData/measurementEvent"
import { usersByIdMap } from "./mockData/users"
import { workoutByIdMap } from "./mockData/workout"
import { exercisesByIdMap } from "./mockData/exercise"
import { getUser } from "../util/getSession"
import { BasicInfoType, ExercisesType, MeasurementDataType, NewMeasurementDataType } from "../util/types"

// const user = getUser()


const getUserBasicInfo = (userEmail: string) => {

    const user = [...usersByIdMap.values()].find(user => user.email === userEmail)

    return user
}

const getUserMeasurements = () => {

    if (user != null) {
        let latestMeasurement: MeasurementDataType | undefined
        measurementEventByIdMap.forEach((measurementEvent) => {
            if (measurementEvent.user === user.name) {
                if (latestMeasurement === undefined) {
                    latestMeasurement = measurementEvent
                } else if (latestMeasurement?.measurements[0].date < measurementEvent.measurements[0].date) {
                    latestMeasurement = measurementEvent
                }
            }
        })
        return latestMeasurement
    }


}

const getUserWorkouts = () => {

    if (user != null) {
        return workoutByIdMap.get(user.id)
    }


}


const updateUserBasicInfo = (userData: BasicInfoType) => {
    const currentUser = usersByIdMap.get(user.id)
    if (userData.currentPassword === currentUser?.password) {
        usersByIdMap.set(user.id,
            {
                id: user.id,
                name: userData.name,
                email: userData.email,
                password: userData.password,
                role: user.role,
                gender: userData.gender,
                dateOfBirth: userData.dateOfBirth,
                height: userData.height,
                workouts: []
            })
    } else {
        throw new Error('Entered current password is invalid!')
    }


}


const addUserMeasurements = (measurementData: NewMeasurementDataType) => {


    measurementEventByIdMap.set(measurementEventByIdMap.size + 1, {
        user: user.name,
        imageUrl: [measurementData.imageUrl],
        measurements: [{
            weight: measurementData.weight,
            chest: measurementData.chest,
            waist: measurementData.waist,
            hips: measurementData.hips,
            biceps: measurementData.biceps,
            date: measurementData.date
        }]
    })

}

const getAllExerciseTypes = () => {


    const allExerciseTypes: ExercisesType[] = []

    exerciseTypesByIdMap.forEach((exerciseType) => {

        allExerciseTypes.push(exerciseType)
    })
    return allExerciseTypes


}

const getExerciseType = (id: number) => {

    return exerciseTypesByIdMap.get(id)


}

const updateExerciseTypeById = (data: { id: number, exerciseName: string; muscleGroups: string }) => {


    exerciseTypesByIdMap.set(data.id, { id: data.id, name: data.exerciseName, muscleGroups: [data.muscleGroups] })
    return exerciseTypesByIdMap.get(data.id)


}

const deleteExerciseTypeById = (id: number) => {


    return exerciseTypesByIdMap.delete(id)


}

const createExerciseType = (data: { exerciseName: string; muscleGroups: string }) => {


    const newEntryKey = exerciseTypesByIdMap.size + 1
    exerciseTypesByIdMap.set(newEntryKey, { id: newEntryKey, name: data.exerciseName, muscleGroups: [data.muscleGroups] })
    return exerciseTypesByIdMap.get(newEntryKey)

}



const getMatchingWorkouts = (filteredWorkout: string) => {

    const matchingWorkouts: { id: number; user: string; exercises: string[]; date: number }[] = []
    const selectedWorkoutId: number | number[] = []

    workoutByIdMap.forEach((workout) => {
        if ((workout.exercises.includes(filteredWorkout)
            || workout.date === (dayjs(filteredWorkout).valueOf()))
            && workout.user === user.name
            && !selectedWorkoutId.includes(workout.id)) {
            selectedWorkoutId.push(workout.id)
            matchingWorkouts.push(workout)
            return
        }
    })

    exerciseTypesByIdMap.forEach((exercise) => {
        if (exercise.muscleGroups.includes(filteredWorkout)) {
            workoutByIdMap.forEach((workout) => {
                if (workout.exercises.includes(exercise.name) && workout.user === user.name && !selectedWorkoutId.includes(workout.id)) {
                    selectedWorkoutId.push(workout.id)
                    matchingWorkouts.push(workout)
                    return
                }
            })
        }
    })

    return matchingWorkouts

}

const getWorkout = (id: number) => {

    return workoutByIdMap.get(id)


}

const updateWorkout = (updatedWorkoutData: { exercises: string[]; id: number; date: number }) => {

    workoutByIdMap.set(updatedWorkoutData.id, {
        id: updatedWorkoutData.id,
        user: workoutByIdMap.get(user.id)?.user,
        exercises: updatedWorkoutData.exercises,
        date: updatedWorkoutData.date
    })


}

const deleteWorkoutById = (workoutId: number) => {

    workoutByIdMap.delete(workoutId)


}

const createWorkout = (data: { exercises: string[]; date: number }) => {

    const newWorkoutId = workoutByIdMap.size + 1
    workoutByIdMap.set(newWorkoutId,
        { id: newWorkoutId, user: user.name, exercises: data.exercises, date: data.date })

    return workoutByIdMap.get(newWorkoutId)

}

const getAllUserExercises = () => {


    const userExercises: ({ id: number; exerciseType: string; sets: number; repetitions: number; weight: number[]; dates: number[]; time?: undefined; distance?: undefined } | { id: number; exerciseType: string; sets: number; time: number; distance: number[]; dates: number[]; repetitions?: undefined; weight?: undefined })[] = []
    if (workoutByIdMap.get(user.id)?.user === user.name) {
        exercisesByIdMap.forEach((exercise) => {

            workoutByIdMap.get(user.id)?.exercises.includes(exercise.exerciseType) && userExercises.push(exercise)
        })

    }
    return userExercises

}

const getAllExerciseWeightChartData = () => {


    const labels = getChartLabels(exercisesByIdMap)
    const datasets = [...exercisesByIdMap.values()].map((dataSet) => {
        return {
            label: dataSet.exerciseType,
            data: dataSet.weight || dataSet.distance
        }
    })


    return {
        labels, datasets
    }

}


const getExerciseWeightChartDataWithinRange = (dateRange: number[]) => {


    const labelsWithinRange: number[] = []
    const datasets: { label: string; data: number[] }[] = []
    const includedDatasets: string[] = []
    exercisesByIdMap.forEach((line) => {
        line.dates.forEach((date) => {
            if (date >= dateRange[0] && date <= dateRange[1] && !includedDatasets.includes(line.exerciseType)) {
                datasets.push({
                    label: line.exerciseType,
                    data: line.weight || line.distance
                })
                includedDatasets.push(line.exerciseType)
            }
            if (date >= dateRange[0] && date <= dateRange[1] && !labelsWithinRange.includes(date)) {
                labelsWithinRange.push(date)
            }
        })
    })
    const labels = labelsWithinRange.map((date) => {
        return dayjs(date).format('DD/MM/YYYY')
    })


    return {
        labels, datasets
    }



}


const getChartLabels = (dataMap: any) => {


    const initialLabels: number[] = []
    const getLabels = [...dataMap.values()].map((dataRow) => {
        dataRow.dates.forEach((date: number) => {
            if (!initialLabels.includes(date)) {
                initialLabels.push(date)
            }
        })
    })

    const labels = initialLabels.map((date) => {
        return dayjs(date).format('DD/MM/YYYY')
    })

    return labels

}

const getUserMeasurementsChartData = () => {


    const datasets: { label: string, data: number[] }[] = []

    const includedLabels: string[] = []

    const labels: number[] = []

    measurementEventByIdMap?.forEach((entry) => {
        if (entry.user === user.name) {
            labels.push(entry.measurements[0].date)
            Object.entries(entry.measurements[0]).map((measurement) => {
                if (measurement[0] !== 'date') {
                    if (!includedLabels.includes(measurement[0])) {
                        datasets.push({ label: measurement[0], data: [measurement[1]] })
                        includedLabels.push(measurement[0])
                    } else {
                        datasets.forEach((set) => {
                            if (set.label === measurement[0]) {
                                set.data.push(measurement[1])
                            }
                        })
                    }
                }
            })
        }

    })
    return {
        labels, datasets
    }

}

const getUserMeasurementsChartRangeData = (dateRange?: number[]) => {


    const labelsWithinRange: number[] = []
    const datasets: { label: string, data: number[] }[] = []
    const includedLabels: string[] = []

    const userMeasurements: { weight: number; chest: number; waist: number; hips: number; biceps: number; date: number }[][] = []

    measurementEventByIdMap.forEach((measurement) => {
        if (measurement.user === user.name) {
            userMeasurements.push(measurement.measurements)
        }
    })

    if (userMeasurements.length < 1) {
        return { labels: [], datasets }
    }


    if (userMeasurements.length >= 1 && dateRange) {
        userMeasurements.forEach((measurement) => {
            if (measurement[0].date >= dateRange[0] && measurement[0].date <= dateRange[1]) {
                labelsWithinRange.push(measurement[0].date)
                measurement.map((measurementData) => {
                    Object.entries(measurementData).forEach((dataPiece) => {
                        if (dataPiece[0] !== 'date') {
                            if (!includedLabels.includes(dataPiece[0])) {
                                datasets.push({ label: dataPiece[0], data: [dataPiece[1]] })
                                includedLabels.push(dataPiece[0])
                            } else {
                                datasets.forEach((set) => {
                                    if (set.label === dataPiece[0]) {
                                        set.data.push(dataPiece[1])
                                    }
                                })
                            }
                        }
                    })
                })
            }
        })

    }



    const labels = labelsWithinRange.map((date) => {
        return dayjs(date).format('DD/MM/YYYY')
    })


    return { labels, datasets }


}




export const userPermittedActions = {
    getUserBasicInfo,
    getUserMeasurements,
    getUserWorkouts,
    updateUserBasicInfo,
    addUserMeasurements,
    getAllExerciseTypes,
    getExerciseType,
    updateExerciseTypeById,
    deleteExerciseTypeById,
    createExerciseType,
    getWorkout,
    updateWorkout,
    deleteWorkoutById,
    createWorkout,
    getMatchingWorkouts,
    getAllUserExercises,
    getAllExerciseWeightChartData,
    getExerciseWeightChartDataWithinRange,
    getUserMeasurementsChartData,
    getUserMeasurementsChartRangeData
}