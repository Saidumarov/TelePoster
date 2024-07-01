"use client";
import { createContext, useState, ReactNode, useEffect } from "react";

// Define the context with a default value
export const UserContext = createContext({
  userInfo: false,
  setUserInfo: (info: boolean) => {},
  render: 0,
  setRender: (info: number) => {},
});

interface Props {
  children: ReactNode;
}

function UserProvider({ children }: Props) {
  const [userInfo, setUserInfo] = useState(false);
  const [render, setRender] = useState(0);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUserInfo(true);
    } else {
      setUserInfo(false);
    }
  }, [render]);
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
