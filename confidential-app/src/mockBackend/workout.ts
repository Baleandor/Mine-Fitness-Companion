export const workoutOne = new Map()

workoutOne.set('id', '1')
workoutOne.set('user', 'Jotaro')
workoutOne.set('exercises', ['deadlift', 'y shoulder raise'])
workoutOne.set('date', [1685960814668])

export const workoutTwo = new Map()

workoutTwo.set('id', '2')
workoutTwo.set('user', 'Dio')
workoutTwo.set('exercises', ['squat', 'overhead tricep extension'])
workoutTwo.set('date', [1685960814668])



export const workoutByIdMap = new Map([
    [1, { user: 'Jotaro', exercises: ['deadlift', 'bench press'], date: [1685960814668] }],
    [2, { user: 'Dio', exercises: ['squat', 'sprint'], date: [1685960814668] }],
])