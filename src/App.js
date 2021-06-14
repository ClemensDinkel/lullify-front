import './App.css';
import Navigation from './components/Navigation'
import LullifyRouter from './components/LullifyRouter'
import { useState, useEffect } from 'react';
import Axios from 'axios';


const App = () => {

  const [videos, setVideos] = useState([])

  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async() => {
    await Axios.get(`https://tranquil-reaches-12289.herokuapp.com/videos`)
    .then(res => console.log(res.data))
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