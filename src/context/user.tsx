"use client";
import { createContext, useState, ReactNode, useEffect } from "react";

// Define the context with a default value
export const UserContext = createContext({
  userInfo: false,
  setUserInfo: (info: boolean) => {},
  render: false,
  setRender: (info: boolean) => {},
});

interface Props {
  children: ReactNode;
}

function UserProvider({ children }: Props) {
  const [userInfo, setUserInfo] = useState(false);
  const [render, setRender] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUserInfo(true);
    }
  }, []);
  return (
    <UserContext.Provider
      value={{
        userInfo,
        setUserInfo,
        render,
        setRender,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
