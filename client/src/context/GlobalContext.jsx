import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext();

function GlobalProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function authUser() {
    try {
      const { data } = await axios.get("http://localhost:3000/api/users/auth", {
        withCredentials: true,
      });
      if (data.success) {
        setIsAuth(true);
        setUser(data.user);
      }
    } catch (error) {
      setIsAuth(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function logOut() {
    try {
      const { data } = await axios.get("http://localhost:3000/api/users/logout", {
        withCredentials: true,
      });
      if (data.success) {
        setIsAuth(false);
        setUser(null);
      }
    } catch (error) {
      return error;
    }
  }

  useEffect(() => {
    authUser();
  }, []);

  const value = {
    isAuth,
    setIsAuth,
    user,
    logOut,
    setUser,
    loading,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

export default GlobalProvider;
