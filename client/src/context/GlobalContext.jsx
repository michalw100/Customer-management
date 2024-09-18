import axios from "axios";
import { createContext, useEffect, useState } from "react";
// import { logOutFn } from "../actions";

export const GlobalContext = createContext();

function GlobalProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  async function authUser() {
    // try {
    //   const { data } = await axios.get("http://localhost:3000/api/users/auth", {
    //     withCredentials: true,
    //   });
    //   if (data.success) {
    //     setIsAuth(true);
    //     setUser(data.user);
    //   }
    // } catch (error) {
    //   return error;
    // }
  }

  async function logOut() {
    // const isSuccess = await logOutFn();
    // if (isSuccess) {
    //   setIsAuth(false);
    //   setUser(null);
    // }
  }

  // useEffect(() => {
  //   authUser();
  // }, []);

  const value = {
    isAuth,
    setIsAuth,
    user,
    logOut,
    setUser,
  };
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

export default GlobalProvider;
