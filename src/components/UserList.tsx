// src/components/UserList.tsx
import React, { useState } from "react";
import { User } from "../api/client/fetchUsers";
import AddUserForm from "./AddUserForm";
import styles from "./styles.module.scss";

interface UserListProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const UserList: React.FC<UserListProps> = ({ users, setUsers }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleSelectUser = (user: User) => {
    if (selectedUser && user.id === selectedUser.id) {
      setSelectedUser(null);
    } else {
      setSelectedUser(user);
    }
  };

  return (
    <div className={styles.user_list}>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={() => handleSelectUser(user)}>
            {user.name}
          </li>
        ))}
      </ul>
      {selectedUser && (
        <div className={styles.selected_user}>
          <h3>Selected User:</h3>
          <p>{selectedUser.name}</p>
          <p>{selectedUser.email}</p>
        </div>
      )}
      {/* 사용자 추가 폼 */}
      <AddUserForm
        onAddUser={(newUser) =>
          setUsers((prevUsers) => [...prevUsers, newUser])
        }
      />
    </div>
  );
};

export default UserList;
