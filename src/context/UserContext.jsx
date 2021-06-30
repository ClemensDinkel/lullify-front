import { useState, useEffect, createContext } from "react";
import api from "../api";
import jwt_decode from "jwt-decode";

export const UserContext = createContext()

export const UserController = ({children}) => {

  const [decToken, setDecToken] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("auth-token"));
  const [singleUserInfo, setSingleUserInfo] = useState({});

  useEffect(() => {
    if (token) {
      setDecToken(jwt_decode(token));
    }
  }, [token]);
  
  useEffect(() => {
    if (decToken && decToken.id) {
      api
        .fetchSingleUser(decToken.id)
        .then((res) => {
          const data = res.data[0];
          setSingleUserInfo({
            first_name: data.first_name,
            last_name: data.last_name,
            user_name: data.user_name,
            email: data.email,
            role: data.role,
            password: "",
            user_img_url: data.user_img_url,
            phone: data.phone,
            street: data.street,
            house_nr: data.house_nr,
            city_code: data.city_code || "",
            city_name: data.city_name || "",
            country: data.country || "",
            company: data.company || "",
            favorites: data.favorites || "",
            errors: {},
          });
        })
        .catch((err) => console.error(err));
    }
    console.log("singleuserinfo set")
  }, [decToken]);

  return( 
    // <UserContext.Provider value={[singleUserInfo, decToken, setDecToken, setToken]}>
    <UserContext.Provider value={{tk: [token,setToken], dTk: [decToken, setDecToken], sUI: [singleUserInfo, setSingleUserInfo]}}>
      {children}
    </UserContext.Provider>
  )


}