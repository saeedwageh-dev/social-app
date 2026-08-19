import axios from "axios";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(
    () => localStorage.getItem("token")
  );

  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function getUserData(token) {
    try {
      const { data } = await axios.get(
        "https://route-posts.routemisr.com/users/profile-data",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUserData(data.data.user);
    } catch (error) {
      console.log(error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        setUserToken(null);
        setUserData(null);
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (userToken) {
      getUserData(userToken);
    } else {
      setIsLoading(false);
    }
  }, [userToken]);

  return (
    <AuthContext.Provider
      value={{
        userToken,
        setUserToken,
        userData,
        setUserData,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, AuthContext };