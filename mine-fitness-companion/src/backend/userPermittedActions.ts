
import dayjs from "dayjs"
import { exerciseTypesByIdMap } from "./mockData/exerciseType"
import { measurementEventByIdMap } from "./mockData/measurementEvent"
import { usersByIdMap } from "./mockData/users"
import { workoutByIdMap } from "./mockData/workout"
import { exercisesByIdMap } from "./mockData/exercise"
import { getUser } from "../util/getUser"


const user = getUser()


const getUserBasicInfo = () => {
    try {
        if (user != null) {
            return usersByIdMap.get(user.id)
        }
    } catch (err) {
        throw new Error(err.message)
    }
}

const getUserMeasurements = () => {
    try {
        if (user != null) {
            return measurementEventByIdMap.get(user.id)
        }

    } catch (err) {
        throw new Error(err.message)
    }
}

const getUserWorkouts = () => {
    try {
        if (user != null) {
            return workoutByIdMap.get(user.id)
        }
    } catch (err) {
        throw new Error(err.message)
    }

}


const updateUserBasicInfo = (userData: { name: string; email: string; password: any; gender: string; dateOfBirth: number; height: number }) => {

    try {
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
    } catch (err) {
        throw new Error(err.message)
    }
}


const addUserMeasurements = (measurementData: { biceps: number; chest: number; date: number; hips: number; imageUrl: string; waist: number; weight: number }) => {

    try {
        measurementEventByIdMap.set(user.id, {
            user: user.name,
            imageUrl: [measurementEventByIdMap.get(user.id), measurementData.imageUrl],
            biceps: [measurementEventByIdMap.get(user.id), measurementData.biceps],
            chest: [measurementEventByIdMap.get(user.id), measurementData.chest],
            date: [measurementEventByIdMap.get(user.id), measurementData.date],
            hips: [measurementEventByIdMap.get(user.id), measurementData.hips],
            waist: [measurementEventByIdMap.get(user.id), measurementData.waist],
            weight: [measurementEventByIdMap.get(user.id), measurementData.weight],
            workouts: []
        })
    } catch (err) {
        throw new Error(err.message)
    }
}

const getAllExerciseTypes = () => {

    try {
        const allExerciseTypes: { id: number; name: string; muscleGroups: string[] }[] = []

        exerciseTypesByIdMap.forEach((exerciseType) => {

            allExerciseTypes.push(exerciseType)
        })
        return allExerciseTypes

    } catch (err) {
        throw new Error(err.message)
    }
}

const getExerciseType = (id: number) => {
    try {
        return exerciseTypesByIdMap.get(id)

    } catch (err) {
        throw new Error(err.message)
    }
}

const updateExerciseTypeById = (id: number, data: { exerciseName: string; muscleGroups: string }) => {

    try {
        return exerciseTypesByIdMap.set(id, { id: id, name: data.exerciseName, muscleGroups: [data.muscleGroups] })

    } catch (err) {
        throw new Error(err.message)
    }
}

const deleteExerciseTypeById = (id: number) => {

    try {
        return exerciseTypesByIdMap.delete(id)

    } catch (err) {
        throw new Error(err.message)
    }
}

const createExerciseType = (data: { exerciseName: string; muscleGroups: string }) => {
    try {

        const newEntryKey = exerciseTypesByIdMap.size + 1
        exerciseTypesByIdMap.set(newEntryKey, { id: newEntryKey, name: data.exerciseName, muscleGroups: [data.muscleGroups] })
    } catch (err) {
        throw new Error(err.message)
    }
}

const getMatchingWorkouts = (filteredWorkout: string) => {
    try {
        const matchingWorkouts: { id: number; user: string; exercises: string[]; date: number }[] = []
        const selectedWorkoutId: number | number[] = []

        workoutByIdMap.forEach((workout) => {
            if (workout.exercises.includes(filteredWorkout)
                || workout.id.toString() === filteredWorkout
                || workout.date === (dayjs(filteredWorkout).valueOf())
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
    } catch (err) {
        throw new Error(err.message)
    }
}

const getWorkout = (id: number) => {
    try {
        return workoutByIdMap.get(id)

    } catch (err) {
        throw new Error(err.message)
    }
}

const updateWorkout = (updatedWorkoutData: { exercises: string[]; id: number; date: number }) => {
    try {

        workoutByIdMap.set(updatedWorkoutData.id, {
            id: updatedWorkoutData.id,
            user: workoutByIdMap.get(user.id)?.user,
            exercises: updatedWorkoutData.exercises,
            date: updatedWorkoutData.date
        })
    } catch (err) {
        throw new Error(err.message)
    }
}

const deleteWorkoutById = (workoutId: number) => {
    try {
        workoutByIdMap.delete(workoutId)

    } catch (err) {
        throw new Error(err.message)
    }
}

const createWorkout = (data: { exercises: string[]; date: number }) => {
    try {

        const newWorkoutId = workoutByIdMap.size + 1
        workoutByIdMap.set(newWorkoutId,
            { id: newWorkoutId, user: user.name, exercises: data.exercises, date: data.date })
    } catch (err) {
        throw new Error(err.message)
    }
}

const getAllUserExercises = () => {
    try {

        const userExercises: ({ id: number; exerciseType: string; sets: number; repetitions: number; weight: number[]; dates: number[]; time?: undefined; distance?: undefined } | { id: number; exerciseType: string; sets: number; time: number; distance: number[]; dates: number[]; repetitions?: undefined; weight?: undefined })[] = []
        if (workoutByIdMap.get(user.id)?.user === user.name) {
            exercisesByIdMap.forEach((exercise) => {

                workoutByIdMap.get(user.id)?.exercises.includes(exercise.exerciseType) && userExercises.push(exercise)
            })

        }
        return userExercises
    } catch (err) {
        throw new Error(err.message)
    }
}

const getAllExerciseWeightChartData = () => {
    try {

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
    } catch (err) {
        throw new Error(err.message)
    }
}


const getExerciseWeightChartDataWithinRange = (dateRange: number[]) => {

    try {
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
    } catch (error) {
        throw new Error(error)
    }


}


const getChartLabels = (dataMap: any[]) => {
    try {

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
    } catch (err) {
        throw new Error(err.message)
    }
}

const getUserMeasurementsChartData = () => {
    try {

        const datasets = []

        const labels = getChartLabels(measurementEventByIdMap)

        const datasetEntries = Object.entries(measurementEventByIdMap.get(user.id))

        for (let i = 2; i < datasetEntries.length - 1; i++) {
            datasets.push({
                label: datasetEntries[i][0],
                data: datasetEntries[i][1]
            })
        }


        return {
            labels, datasets
        }
    } catch (err) {
        throw new Error(err.message)
    }
}

const getUserMeasurementsChartRangeData = (dateRange: number[]) => {

    try {
        const labelsWithinRange: number[] = []
        const datasets: { label: string, data: number[] }[] = []
        const dateIndexes = []
        const temporaryMap = new Map<any, any>([
            ['label', []]
        ])

        const datasetEntries = Object.entries(measurementEventByIdMap.get(user.id))
        const userDates = measurementEventByIdMap.get(user.id)?.dates

        if (datasetEntries && userDates) {

            for (let i = 0; i < userDates.length; i++) {
                if (userDates[i] >= dateRange[0] && userDates[i] <= dateRange[1]) {
                    temporaryMap.set('label', [...temporaryMap.get('label'), userDates[i]])
                    labelsWithinRange.push(userDates[i])
                    dateIndexes.push(i)
                }
            }

            dateIndexes.forEach((entry) => {
                for (let i = 2; i < datasetEntries.length - 1; i++) {
                    const labelName = datasetEntries[i][0]
                    const labelData = datasetEntries[i][1][entry]

                    if ([...temporaryMap.keys()].find((element) => element === labelName)) {
                        temporaryMap.set(labelName, [...temporaryMap.get(labelName), (labelData)])
                    } else {
                        temporaryMap.set(labelName, [labelData])
                    }
                }
            })
        }

        [...temporaryMap.entries()].map((entry) => {
            if (entry[0] !== 'label') {
                datasets.push({
                    label: entry[0],
                    data: entry[1]
                })
            }
        })

        const labels = labelsWithinRange.map((date) => {
            return dayjs(date).format('DD/MM/YYYY')
        })


        return { labels, datasets }

    } catch (error) {
        throw new Error(error)
    }
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