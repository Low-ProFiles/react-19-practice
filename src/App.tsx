// src/App.tsx
import { useState, useEffect } from "react";
import { fetchUsers, User } from "./api/client/fetchUsers";
import UserList from "./components/UserList";

function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const loadUsers = async () => {
      const usersData = await fetchUsers();
      setUsers(usersData);
    };
    loadUsers();
  }, []);

  return (
    <div>
      <h1>React 19 Demo</h1>
      <UserList users={users} setUsers={setUsers} />
    </div>
  );
}

export default App;
