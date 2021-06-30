import "./App.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import LullifyRouter from "./components/LullifyRouter";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { VideoController } from "./context/VideoContext";
import { UserController } from "./context/UserContext";
import { PlaylistController } from "./context/PlaylistContext";

const App = () => {

  return (
    <div className="App">
      <VideoController>
        <UserController>
          <PlaylistController>
            <Navigation />
            <LullifyRouter />
            <Footer />
          </PlaylistController>
        </UserController>
      </VideoController>
    </div>
  );
};

export default App;
