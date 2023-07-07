

export const userOne = new Map<string, any>()

userOne.set('id', '1')
userOne.set('name', 'Jotaro')
userOne.set('email', 'jotaro@oraora.com')
userOne.set('password', 'jolyne')
userOne.set('role', 'user')
userOne.set('gender', 'male')
userOne.set('dateOfBirth', '01-01-1986')
userOne.set('height', '195')
userOne.set('workouts', '[workoutOne]')


export const usersByIdMap = new Map([
    [1, { id: 1, name: 'Jotaro', email: 'jotaro@oraora.com', password: 'jolyne', role: 'user', gender: 'male', dateOfBirth: 504910800, height: 195, workouts: [] }],
    [2, { id: 2, name: 'Dio', email: 'dio@oraora.com', password: 'joseph', role: 'admin', gender: 'male', dateOfBirth: 504910800, height: 195, workouts: [] }]
])