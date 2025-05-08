const API_URL = "http://localhost:8000/api"

export async function loginUser(email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      username: email, // FastAPI yêu cầu key là "username"
      password,
    }),
  })

  if (!res.ok) {
    throw new Error("Đăng nhập thất bại")
  }

  const data = await res.json()

  const token = data.access_token

  // Lấy thông tin người dùng
  const userRes = await fetch(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!userRes.ok) {
    throw new Error("Không thể lấy thông tin người dùng")
  }

  const user = await userRes.json()

  // Lưu token & user vào localStorage
  localStorage.setItem("token", token)
  localStorage.setItem("user", JSON.stringify(user))

  return {
    token,
    user,
  }
}

export function logoutUser() {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
}

export function getToken(): string | null {
  return localStorage.getItem("token")
}

export function getUser(): any | null {
  const userData = localStorage.getItem("user")
  return userData ? JSON.parse(userData) : null
}

export function isLoggedIn(): boolean {
  return !!localStorage.getItem("token")
}

export async function registerUser(data: {
  username: string;
  email: string;
  password: string;
  full_name: string;
  age: number;
  occupation: string;
  role?: string; // default là "user"
}) {
  const res = await fetch("http://localhost:8000/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...data, role: data.role || "user" }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Đăng ký thất bại");
  }

  return await res.json();
}
