"use server";
import { User } from "../client/fetchUsers";

export async function addUser(prevState: User | null): Promise<User | null> {
  const formData = prevState as unknown as FormData; // 타입 캐스팅
  console.log(formData, "formData");
  const newUser = {
    email: formData.get("email") as string,
    id: Date.now(),
    name: formData.get("name") as string,
  };

  // 서버 처리 (여기서는 서버 측 지연을 시뮬레이션)
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return newUser;
}
