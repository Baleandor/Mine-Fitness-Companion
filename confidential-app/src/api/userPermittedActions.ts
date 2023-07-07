
import dayjs from "dayjs"
import { exerciseTypesByIdMap } from "../mockBackend/exerciseType"
import { measurementEventByIdMap } from "../mockBackend/measurementEvent"
import { usersByIdMap } from "../mockBackend/users"
import { workoutByIdMap } from "../mockBackend/workout"
import { exercisesByIdMap } from "../mockBackend/exercise"



const user = JSON.parse(localStorage.getItem('user'))


const getUserBasicInfo = () => {
    if (user != null) {
        return usersByIdMap.get(user.id)
    }
}

const getUserMeasurements = () => {
    if (user != null) {
        return measurementEventByIdMap.get(user.id)
    }
}

const getUserWorkouts = () => {
    if (user != null) {
        return workoutByIdMap.get(user.id)
    }

}


const updateUserBasicInfo = (userData: { name: string; email: string; password: any; gender: string; dateOfBirth: number; height: number }) => {
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
}


const addUserMeasurements = (measurementData: { biceps: number; chest: number; date: number; hips: number; imageUrl: string; waist: number; weight: number }) => {
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
}

const getAllExerciseTypes = () => {

    const allExerciseTypes = []

    exerciseTypesByIdMap.forEach((exerciseType) => {

        allExerciseTypes.push(exerciseType)
    })
    return allExerciseTypes
}

const getExerciseType = (id: number) => {
    return exerciseTypesByIdMap.get(id)
}

const updateExerciseTypeById = (id: number, data: { exerciseName: string; muscleGroups: string }) => {
    return exerciseTypesByIdMap.set(id, { id: id, name: data.exerciseName, muscleGroups: [data.muscleGroups] })
}

const deleteExerciseTypeById = (id: number) => {
    return exerciseTypesByIdMap.delete(id)
}

const createExerciseType = (data: { exerciseName: string; muscleGroups: string }) => {
    const newEntryKey = exerciseTypesByIdMap.size + 1
    exerciseTypesByIdMap.set(newEntryKey, { id: newEntryKey, name: data.exerciseName, muscleGroups: [data.muscleGroups] })
}

const getMatchingWorkouts = (filteredWorkout: string) => {
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
}

const getAllUserExercises = () => {
    const userExercises = []
    if (workoutByIdMap.get(user.id)?.user === user.name) {
        exercisesByIdMap.forEach((exercise) => {

            workoutByIdMap.get(user.id)?.exercises.includes(exercise.exerciseType) && userExercises.push(exercise)
        })

    }
    return userExercises
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
    getAllUserExercises
}