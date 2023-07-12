


export const exerciseProgressData = [
    { date: 1685960814668, deadlift: 420, squat: 333, 'bench press': 250, sprint: 55 },
    { date: 1686344400000, deadlift: 460, squat: 375, 'bench press': 300, sprint: 53 },
    { date: 1687208400000, deadlift: 485, squat: 420, 'bench press': 325, sprint: 50 },
    { date: 1688072400000, deadlift: 500, squat: 500, 'bench press': 420, sprint: 42 },

]


export const exercisesByIdMap = new Map([
    [1, { exerciseType: 'deadlift', sets: 4, repetitions: 10, weight: [420, 460, 485, 500] }],
    [2, { exerciseType: 'squat', sets: 4, repetitions: 8, weight: [420, 460, 485, 500] }],
    [3, { exerciseType: 'bench press', sets: 4, repetitions: 12, weight: [420, 460, 485, 500] }],
    [4, { exerciseType: 'sprints', sets: 3, time: 69, distance: 420 }],
])

