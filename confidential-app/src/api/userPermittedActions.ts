
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


const updateUserBasicInfo = (userData) => {

    usersByIdMap.forEach((userInDatabase) => {

        if (userInDatabase.name === user.name) {
            for (let userInfo in userInDatabase) {

                if (userInfo === 'role') {
                    userInfo = userInDatabase[userInfo]
                } else if (userInfo === 'workouts') {

                    userInfo = userInDatabase[userInfo]
                } else {

                    console.log(userInfo, userData[userInfo])
                    userInfo = userData[userInfo]
                }
            }

        }
    })

}

const addUserMeasurements = (measurementData: { biceps: number; chest: number; date: number; hips: number; imageUrl: string; waist: number; weight: number }) => {
    measurementEventByIdMap.forEach((measurementEvent) => {
        if (measurementEvent.user === user.name) {
            measurementEvent.biceps.push(measurementData.biceps)
            measurementEvent.chest.push(measurementData.chest)
            measurementEvent.date.push(measurementData.date)
            measurementEvent.hips.push(measurementData.hips)
            measurementEvent.imageUrl.push(measurementData.imageUrl)
            measurementEvent.waist.push(measurementData.waist)
            measurementEvent.weight.push(measurementData.weight)
        }
    })
}




export const userPermittedActions = {
    getUserBasicInfo,
    getUserMeasurements,
    getUserWorkouts,
    updateUserBasicInfo,
    addUserMeasurements
}