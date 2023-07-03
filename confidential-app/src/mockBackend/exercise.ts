export const exercise = new Map()

exercise.set('id', '1')
exercise.set('exerciseType', 'deadlift')
exercise.set('sets', '4')
exercise.set('repetitions', '10') //optional
exercise.set('weight', [420, 460, 485, 500])//optional
exercise.set('time', '') //optional
exercise.set('distance', '') //optional

//EXERCISEESS map
//make faux API functions

export const exerciseMeasuringData = [
    { date: "05/06/2023", weight: 100 },
    { date: "08/06/2023", weight: 102 },
    { date: "10/06/2023", weight: 104 },
    { date: "15/06/2023", weight: 107 },
]



export const exercisesByIdMap = new Map([
    [1, { exerciseType: 'deadlift', sets: 4, repetitions: 10, weight: [420, 460, 485, 500] }],
    [2, { exerciseType: 'squat', sets: 4, repetitions: 8, weight: [420, 460, 485, 500] }],
    [3, { exerciseType: 'bench press', sets: 4, repetitions: 12, weight: [420, 460, 485, 500] }],
    [4, { exerciseType: 'sprints', sets: 3, time: 69, distance: 420 }],
])

