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
                role: 'user'
            })
        return usersByIdMap.get(usersByIdMap.size)

    } else {
        throw new Error('User already exists!')
    }
}

const login = (userData: { email: string; password: string }) => {

    const user = [...usersByIdMap.values()].find(user => user.email === userData.email)

    if (user === undefined) {
        throw new Error(`User doesn't exist!`)
    }

    if (user?.password !== userData.password) {
        throw new Error(`Incorrect password!`)
    } else {
        const token = self.crypto.randomUUID()
        return token as string
    }
}

const logout = () => {
    localStorage.removeItem('user')
}

const getUserProfile = (email: string) => {
    const user = [...usersByIdMap.values()].find(user => user.email === email)

    return user
}

export const authService = {
    register,
    login,
    logout,
    getUserProfile
}

export type AuthServiceType = typeof authService