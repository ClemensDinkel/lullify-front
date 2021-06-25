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
