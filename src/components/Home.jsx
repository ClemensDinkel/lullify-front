import { useContext } from 'react';
import Previews from './Previews'
import Playlists from './Playlists'
import LocalPlaylists from './LocalPlaylists'
import { UserContext } from "../context/UserContext";

const Home = () => {
  const { dTk } = useContext(UserContext);
  const [decToken] = dTk;

return (
  <div className="main">
    <Previews />
    {decToken && decToken.id ? 
    <Playlists /> :
    <LocalPlaylists/>
    }
    
  </div>
)
}

export default Home