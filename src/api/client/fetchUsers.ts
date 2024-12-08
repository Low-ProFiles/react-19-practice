// src/api/client/fetchUsers.ts
export interface User {
  email: string;
  id: number;
  name: string;
}

export async function fetchUsers(): Promise<User[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!response.ok) throw new Error("Failed to fetch users");
  return response.json();
}

export async function createUser(user: {
  name: string;
  id: number;
  email: string;
}): Promise<User> {
  const response = await fetch("https://jsonplaceholder.typicode.com/users", {
    method: "POST", // POST 요청을 보냄
    headers: {
      "Content-Type": "application/json", // 요청 본문이 JSON 형식임을 명시
    },
    body: JSON.stringify(user), // 전달할 사용자 정보를 JSON으로 변환하여 본문에 포함
  });

  // 응답이 성공적이지 않으면 오류를 발생시킴
  if (!response.ok) throw new Error("Failed to create user");

  // 서버로부터 받은 응답을 JSON 형식으로 변환하여 반환
  const createdUser = await response.json();
  console.log(createdUser, "createdUser");
  return createdUser;
}
