export const getUser = () => {
    try {
        let user = localStorage.getItem('user')
        if (user != null) {
            return JSON.parse(user)
        }
    } catch (err) {
        throw new Error()
    }
}
