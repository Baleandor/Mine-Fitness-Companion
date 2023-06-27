const exerciseTypes = {
    deadlift: {
        id: 1,
        name: 'Deadlift',
        muscleGroups: ['back', 'legs', 'posterior chain']
    },
    squat: {
        id: 2,
        name: 'Squat',
        muscleGroups: ['legs', 'hips']
    },
    benchPress: {
        id: 3,
        name: 'Bench Press',
        muscleGroups: ['chest', 'shoulders', 'triceps']
    }
}

const workoutOne = new Map()

workoutOne.set('id', '1')
workoutOne.set('user', 'Jotaro')
workoutOne.set('exercises', [exerciseTypes.deadlift, exerciseTypes.squat])
workoutOne.set('date', [1685960814668])


export const userOne = new Map<string, any>()

userOne.set('id', '1')
userOne.set('name', 'Jotaro')
userOne.set('email', 'jotaro@oraora.com')
userOne.set('password', 'jolyne')
userOne.set('role', 'user')
userOne.set('gender', 'male')
userOne.set('dateOfBirth', '01-01-1986')
userOne.set('height', '195')
userOne.set('workouts', [workoutOne])


export const measurementEvent = new Map()

measurementEvent.set('imageUrl', ['https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fyt3.ggpht.com%2Fa%2FAATXAJyXIyQ8hWmx6Z-4x5l_-qJVjObcudPNrImXt3I4eg%3Ds900-c-k-c0xffffffff-no-rj-mo&f=1&nofb=1&ipt=5aaf02fce7babdc256a9be0c68a98e58c9de24dbcf84cb5d3f45971bebaed610&ipo=images'])
measurementEvent.set('weight', [100])
measurementEvent.set('chest', [120])
measurementEvent.set('waist', [70])
measurementEvent.set('hips', [85])
measurementEvent.set('biceps', [45])
measurementEvent.set('date', [1685960814668])
measurementEvent.set('user', userOne)