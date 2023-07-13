


export const exerciseProgressData = [
    { id: 1, date: 1685960814668, deadlift: 420, squat: 333, 'bench press': 250, sprint: 55 },
    { id: 2, date: 1686344400000, deadlift: 460, squat: 375, 'bench press': 300, sprint: 53 },
    { id: 3, date: 1687208400000, deadlift: 485, squat: 420, 'bench press': 325, sprint: 50 },
    { id: 4, date: 1688072400000, deadlift: 500, squat: 500, 'bench press': 420, sprint: 42 },

]


export const exercisesByIdMap = new Map([
    [1, { id: 1, exerciseType: 'deadlift', sets: 4, repetitions: 10, weight: [420, 460, 485, 500], dates: [1685960814668, 1686344400000, 1687208400000, 1688072400000] }],
    [2, { id: 2, exerciseType: 'squat', sets: 4, repetitions: 8, weight: [333, 375, 420, 500], dates: [1685960814668, 1686344400000, 1687208400000, 1688072400000] }],
    [3, { id: 3, exerciseType: 'bench press', sets: 4, repetitions: 12, weight: [250, 300, 325, 420], dates: [1685960814668, 1686344400000, 1687208400000, 1688072400000] }],
    [4, { id: 4, exerciseType: 'sprints', sets: 3, time: 69, distance: [42, 50, 53, 55], dates: [1685960814668, 1686344400000, 1687208400000, 1688072400000] }],
])

