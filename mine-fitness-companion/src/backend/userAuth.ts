import { usersByIdMap } from "./mockData/users"


export type UserDataType = {
    name: string,
    email: string,
    password: string,
    birthDate: number,
    gender: string,
    height: number
}



const register = (userRegisterData: UserDataType) => {
    try {
        const { name, email, password, gender, birthDate, height } = userRegisterData
        if ([...usersByIdMap.values()].find(element => element.email === email) === undefined) {
            usersByIdMap.set(usersByIdMap.size + 1,
                {
                    id: usersByIdMap.size + 1,
                    name: name,
                    email: email,
                    password: password,
                    dateOfBirth: birthDate,
                    gender: gender,
                    height: height,
                    role: 'user',
                    workouts: []
                })
            return userRegisterData

        } else {
            throw new Error('User already exists!')
        }

    } catch (err) {
        throw new Error(err.message)
    }
}

const login = (userData: { email: string; password: string }) => {

    // [...usersByIdMap.values()].find

    usersByIdMap.forEach((user) => {
        if (user.email === userData.email && user.password === userData.password) {
            localStorage.setItem('user', JSON.stringify(user))
        }
    })
}

const logout = () => {
    localStorage.removeItem('user')
}


export const authService = {
    register,
    login,
    logout
}