import axios from "axios";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [userData,setUserData] = useState(null)

  async function getUserData() {
   let {data}= await axios.get("https://route-posts.routemisr.com/users/profile-data", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(data)
    setUserData(data.data.user)
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setUserToken(localStorage.getItem("token"));
      getUserData()
    }
  }, [userToken]);

  return <AuthContext.Provider value={{ userToken, setUserToken,userData }}>{children}</AuthContext.Provider>;
};
export { AuthContextProvider, AuthContext };
