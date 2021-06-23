import "./App.css";
import Navigation from "./components/Navigation";
import LullifyRouter from "./components/LullifyRouter";
import { useState, useEffect } from "react";
//import { fetchVideos } from './api';
import api from "./api";
import jwt_decode from "jwt-decode";
import { VideoController } from "./context/VideoContext";
import { UserController } from "./context/UserContext";

const App = () => {
  // to decode a token  token
  const [decToken, setDecToken] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("auth-token"));
  const [singleUserInfo, setSingleUserInfo] = useState({});

  useEffect(() => {
    if (token) {
      setDecToken(jwt_decode(token));
    }
  }, [token]);
  
  useEffect(() => {
    console.log(singleUserInfo);
    if (decToken && decToken.id) {
      api
        .fetchSingleUser(decToken.id)
        .then((res) => {
          console.log(res.data[0]);
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
            city_code: data.city_code || "",
            city_name: data.city_name || "",
            country: data.country || "",
            company: data.company || "",
            errors: {},
          });
        })
        .catch((err) => console.error(err));
    }
    console.log(decToken);
  }, [decToken]);

  useEffect(() => {
    if (singleUserInfo) console.log(singleUserInfo);
  }, [singleUserInfo]);

  return (
    <div className="App">
      <VideoController>
      <UserController>
      <Navigation
        user={decToken}
        setToken={setToken}
        setUser={setDecToken}
        singleUserInfo={singleUserInfo}
      />
      <LullifyRouter
        user={decToken}
        setToken={setToken}
        singleUserInfo={singleUserInfo}
      />
      </UserController>
      </VideoController>
    </div>
  );
};

export default App;
