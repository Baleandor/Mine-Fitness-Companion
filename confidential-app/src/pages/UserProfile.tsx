import { userOne } from "../mockBackend/users"






export default function UserProfile() {

    return (
        <div>
            <div>
                <span>Name: {userOne.get('name')}</span>
            </div>
            <div>
                <span>Email: {userOne.get('email')}</span>
            </div>
            <div>
                <span>Gender: {userOne.get('Gender')}</span>
            </div>
            <div>
                <span>Date of Birth: {userOne.get('dateOfBirth')}</span>
            </div>
            <div>
                <span>Height: {userOne.get('height')}</span>
            </div>
        </div>
    )
}




// userOne.set('name', 'Jotaro')
// userOne.set('email', 'jotaro@oraora.com')
// userOne.set('password', 'jolyne')
// userOne.set('role', 'user')
// userOne.set('gender', 'male')
// userOne.set('dateOfBirth', '1')
// userOne.set('height', '195')
