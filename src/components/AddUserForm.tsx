// src/components/AddUserForm.tsx
import { useActionState } from "react";
import { createUser, User } from "../api/client/fetchUsers";

async function addUser(
  previousUsers: User[],
  newUserParams: User
): Promise<User[]> {
  const newUser = await createUser({
    name: newUserParams.name,
    id: newUserParams.id,
    email: newUserParams.email,
  });

  // 기존 사용자 목록에 새로운 사용자 추가
  return [...previousUsers, newUser];
}

const AddUserForm = ({ onAddUser }: { onAddUser: (newUser: User) => void }) => {
  const [, formAction, isPending] = useActionState(addUser, []); // users는 필요하지 않음

  return (
    <form
      action={async (formData: FormData) => {
        const newUser: User = {
          id: Date.now(),
          name: formData.get("name") as string,
          email: formData.get("email") as string,
        };

        await formAction(newUser); // 서버 액션 호출

        // 부모 컴포넌트의 상태 업데이트
        onAddUser(newUser);
      }}
    >
      <h3>Add a New User</h3>
      <input type="text" name="name" placeholder="Name" required />
      <input type="email" name="email" placeholder="Email" required />
      <button type="submit" disabled={isPending}>
        {isPending ? "Adding..." : "Add User"}
      </button>
    </form>
  );
};

export default AddUserForm;
