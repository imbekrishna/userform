import { useState } from "react"
import UserForm from "./components/Form"
import UserTable from "./components/Table"
import { TUser } from "./types"
import useUsers from "./hooks/useUsers"


export default function App() {
  const { users, addUser, deleteUser, updateUser } = useUsers();
  const [user, setUser] = useState<TUser | undefined>(undefined);
  const isEditing = !!user

  const handleEditUser = (user: TUser) => {
    setUser(user)
  }

  return (
    // TODO: Update to allow user editing
    <>
      <UserForm user={user} onSubmit={addUser} onEdit={updateUser} />

      <br />
      <br />

      <UserTable
        users={users}
        deleteUser={deleteUser}
        editUser={handleEditUser}
      />

    </>
  )
}