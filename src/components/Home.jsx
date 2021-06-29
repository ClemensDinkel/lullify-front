import { useContext } from 'react';
import Previews from './Previews'
import Playlists from './Playlists'
import LocalPlaylists from './LocalPlaylists'
import { UserContext } from "../context/UserContext";
import '../App.css'

const Home = () => {
  const { dTk } = useContext(UserContext);
  const [decToken] = dTk;

return (
  <div className="home-container">
    <Previews />
    {decToken && decToken.id ? 
    <Playlists /> :
    <LocalPlaylists/>
    }
    
  </div>
)
}

export default Home