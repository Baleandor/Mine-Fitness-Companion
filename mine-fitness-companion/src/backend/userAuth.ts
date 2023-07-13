import { usersByIdMap } from "./mockData/users"


export type UserDataType = {
    name: string,
    email: string,
    password: string,
    birthDate: number,
    gender: string,
    height: number
}



const register = async (userRegisterData: UserDataType) => {
    usersByIdMap.set(usersByIdMap.size + 1,
        {
            id: usersByIdMap.size + 1,
            name: userRegisterData.name,
            email: userRegisterData.email,
            password: userRegisterData.password,
            dateOfBirth: userRegisterData.birthDate,
            gender: userRegisterData.gender,
            height: userRegisterData.height,
            role: 'user',
            workouts: []
        })
//check for existing user and return proper code

    return userRegisterData
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