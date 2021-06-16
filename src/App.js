import './App.css';
import Navigation from './components/Navigation'
import LullifyRouter from './components/LullifyRouter'
import { useState, useEffect } from 'react';
import axios from 'axios';
//import { fetchVideos } from './api'; 
import api from './api';


const App = () => {

  const root = "https://tranquil-reaches-12289.herokuapp.com"

  const [videos, setVideos] = useState([])

  
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
      <Navigation />
      <LullifyRouter />
    </div>
  );
}

export default App;