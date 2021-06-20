import "./App.css";
import Navigation from "./components/Navigation";
import LullifyRouter from "./components/LullifyRouter";
import { useState, useEffect } from "react";
import axios from "axios";
//import { fetchVideos } from './api';
import api from "./api";
import jwt_decode from "jwt-decode";

const App = () => {
  // to decode a token  token
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("auth-token"));

  useEffect(() => {
    if (token) {
      console.log(token);
      const decToken = jwt_decode(token);
      setUser(decToken);
    }
  }, [token]);

  useEffect(() => {
    if (user) console.log(user);
  }, [user]);

  // to get all info of single specific user

  const [singleUserInfo, setSingleUserInfo] = useState({});

  useEffect(() => {
    console.log(singleUserInfo);
    if (user && user.id) {
      api
        .fetchSingleUser(user.id)
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
    console.log(user);
  }, [user]);

  useEffect(() => {
    if (singleUserInfo) console.log(singleUserInfo);
  }, [singleUserInfo]);

  return (
    <div className="App">
      <Navigation
        user={user}
        setToken={setToken}
        setUser={setUser}
        singleUserInfo={singleUserInfo}
      />
      <LullifyRouter
        user={user}
        setToken={setToken}
        singleUserInfo={singleUserInfo}
      />
    </div>
  );
};

export default App;
