import dayjs from "dayjs"
import { usersByIdMap } from "../mockBackend/users"


export type UserDataType = {
    name: string,
    email: string,
    password: string,
    dateOfBirth: number,
    gender: string,
    height: number,
    role?: string,
    workouts?: []
}



const register = async (userRegisterData: UserDataType) => {

    const dateOfBirth = dayjs(userRegisterData.dateOfBirth).unix()
    usersByIdMap.set(usersByIdMap.size + 1,
        {
            name: userRegisterData.name,
            email: userRegisterData.email,
            password: userRegisterData.password,
            dateOfBirth: dateOfBirth,
            gender: userRegisterData.gender,
            height: userRegisterData.height,
            role: 'user',
            workouts: []
        })
    console.log(usersByIdMap.get(3)?.dateOfBirth)
    localStorage.setItem('user', JSON.stringify(userRegisterData))

    return userRegisterData
}

const login = async (userData: UserDataType) => {
    localStorage.setItem('user', JSON.stringify(userData))
}

const logout = () => {
    localStorage.removeItem('user')
}


export const authService = {
    register,
    login,
    logout
}