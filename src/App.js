import './App.css';
import Navigation from './components/Navigation'
import LullifyRouter from './components/LullifyRouter'
import { useState, useEffect } from 'react';
import axios from 'axios';
//import { fetchVideos } from './api'; 
import api from './api';
import jwt_decode from 'jwt-decode'


const App = () => {

  const root = "https://tranquil-reaches-12289.herokuapp.com"

  const [videos, setVideos] = useState([])
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('auth-token'))

  useEffect(() => {
    if (token) {
      console.log(token)
      const decToken = jwt_decode(token);
      setUser(decToken);
    }
  }, [token])

  useEffect(() =>{
    if (user) console.log(user)
  },[user])
  
  //console.log(videos)

  /* useEffect(() => {
    console.log(api.fetchVideos())
    try {
      const res = api.fetchVideos2();
      console.log(res)
    } catch (error) {
      console.error(error)
    }
    //setVideos(fetchVideos) 
  }, []) */

  useEffect(() => {
    fetchVideos()
  },[])

  const fetchVideos = async () => {
    await axios.get(`${root}/videos`)
        .then(res => {
          console.log(res.data)
          setVideos(res.data)
        })
        .catch(err => console.log(err))
} 

  return (
    <div className="App">
      <Navigation user={user} setToken={setToken} setUser={setUser}/>
      <LullifyRouter setToken={setToken}/>
    </div>
  );
}

export default App;