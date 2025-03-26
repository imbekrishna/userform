import { useState } from "react"
import { TUser } from "../types.ts"

const useUsers = () => {

    const [users, setUsers] = useState<TUser[]>([])

    const addUser = (user: TUser) => {
        setUsers(prev => [...prev, user])
    }

    const deleteUser = (email: TUser['email']) => {
        setUsers( prev => prev.filter(_user => _user.email !== email))
    }

    const updateUser = (email: TUser['email'], user: TUser) => {
        setUsers( prev => prev.map(_user => _user.email === email ? user : _user ))
    }

    return {
        users,
        addUser,
        deleteUser,
        updateUser
    }
}