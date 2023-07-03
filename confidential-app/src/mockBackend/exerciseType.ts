export const exerciseTypes = {
    deadlift: {
        id: 1,
        name: 'deadlift',
        muscleGroups: ['back', 'legs', 'posterior chain']
    },
    squat: {
        id: 2,
        name: 'squat',
        muscleGroups: ['legs', 'hips']
    },
    benchPress: {
        id: 3,
        name: 'bench press',
        muscleGroups: ['chest', 'shoulders', 'triceps']
    }
}


export const exerciseTypesByIdMap = new Map([
    [1, { name: 'deadlift', muscleGroups: ['back', 'legs', 'posterior chain'] }],
    [2, { name: 'squat', muscleGroups: ['legs', 'hips'] }],
    [3, { name: 'bench press', muscleGroups: ['chest', 'shoulders', 'triceps'] }],
    [4, { name: 'sprint', muscleGroups: ['legs', 'hips', 'calves'] }],
])






