
import { TUser } from "../types"

interface TableProps {
  users: TUser[],
  deleteUser: (email: TUser['email']) => void
  editUser: (user: TUser) => void
}

export default function Table(props: Readonly<TableProps>) {

  const { users, deleteUser, editUser } = props;

  return (
    <>
      <h2>User List</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Bio</th>
            <th> Actions </th>
          </tr>
        </thead>
        <tbody>
          {
            users.map(user => {
              return <tr key={user.email}>
                <td> {user.name} </td>
                <td> {user.email} </td>
                <td> {user.gender} </td>
                <td> {user.bio || "-"}</td>
                <td>
                  <button onClick={() => editUser(user)}>
                    Edit
                  </button>
                  <button onClick={() => deleteUser(user.email)}>
                    Delete
                  </button>
                </td>
              </tr>
            })
          }
        </tbody>
      </table>
    </>
  )
}