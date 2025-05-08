// "use client"

// import { createContext, useContext, useEffect, useState } from "react"

// type UserType = {
//   id: string
//   username: string
//   email: string
//   role: string
//   // Thêm các field khác nếu cần
// }

// type AuthContextType = {
//   isLoggedIn: boolean
//   user: UserType | null
//   login: (userData: UserType, token: string) => void
//   logout: () => void
// }

// const AuthContext = createContext<AuthContextType>({
//   isLoggedIn: false,
//   user: null,
//   login: () => {},
//   logout: () => {},
// })

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false)
//   const [user, setUser] = useState<UserType | null>(null)

//   useEffect(() => {
//     const token = localStorage.getItem("token")
//     const storedUser = localStorage.getItem("user")
//     if (token && storedUser) {
//       setIsLoggedIn(true)
//       setUser(JSON.parse(storedUser))
//     }
//   }, [])

//   const login = (userData: UserType, token: string) => {
//     localStorage.setItem("token", token)
//     localStorage.setItem("user", JSON.stringify(userData))
//     setUser(userData)
//     setIsLoggedIn(true)
//   }

//   const logout = () => {
//     localStorage.removeItem("token")
//     localStorage.removeItem("user")
//     setUser(null)
//     setIsLoggedIn(false)
//   }

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export const useAuth = () => useContext(AuthContext)

"use client";

import { createContext, useContext, useEffect, useState } from "react";

type UserType = {
  id: string;
  username: string;
  email: string;
  role: "admin" | "owner" | "user"; // Thêm kiểu role
  // Thêm các field khác nếu cần
};

type AuthContextType = {
  isLoggedIn: boolean;
  user: UserType | null;
  login: (userData: UserType, token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser)); // Giải mã thông tin người dùng từ localStorage
    }
  }, []);

  const login = (userData: UserType, token: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData)); // Lưu thông tin user vào localStorage
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
