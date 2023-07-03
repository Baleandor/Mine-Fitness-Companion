
import { measurementEventByIdMap } from "../mockBackend/measurementEvent"
import { usersByIdMap } from "../mockBackend/users"
import { workoutByIdMap } from "../mockBackend/workout"

const user = JSON.parse(localStorage.getItem('user'))

const getUserBasicInfo = () => {
    let userBasicData
    if (user != null) {
        usersByIdMap.forEach((userInDatabase) => {
            if (user.email === userInDatabase.email) {
                userBasicData = userInDatabase
                return
            }
        })
    }

    return userBasicData
}

const getUserMeasurements = () => {
    let userMeasurementEvent
    measurementEventByIdMap.forEach((measurementEvent) => {
        if (measurementEvent.user === user.name) {
            userMeasurementEvent = measurementEvent
            return
        }
    })

    return userMeasurementEvent
}

const getUserWorkouts = () => {
    let userWorkouts
    workoutByIdMap.forEach((workoutByUser) => {
        if (workoutByUser.user === user.name) {
            userWorkouts = workoutByUser
            return
        }
    })

    return userWorkouts
}

export const userPermittedActions = {
    getUserBasicInfo,
    getUserMeasurements,
    getUserWorkouts
}