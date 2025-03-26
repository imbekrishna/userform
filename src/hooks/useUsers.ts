import { useState } from "react"
import { TUser, TUserField } from "../types.ts"


const useUsers = () => {

    const [users, setUsers] = useState<TUser[]>([])

    const addUser = (user: TUser): Promise<void | { TUserField: string }> => {
        return new Promise((resolve, reject) => {
            const doesExist = users.find(u => u.email === user.email);
            if (!doesExist) {
                setUsers(prev => [...prev, user])
                resolve()
            }
            reject({ email: `User with email ${user.email} already exists` })
        })
    }

    const deleteUser = (email: TUser['email']) => {
        setUsers(prev => prev.filter(_user => _user.email !== email))
    }

    const updateUser = (user: TUser) => {
        setUsers(prev => prev.map(_user => _user.email === user.email ? user : _user))
    }

    return {
        users,
        addUser,
        deleteUser,
        updateUser
    }
}

export default useUsers;