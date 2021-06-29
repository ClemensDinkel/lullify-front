import { useContext } from 'react';
import Previews from './Previews'
import Playlists from './Playlists'
import TemporaryPlaylist from './TemporaryPlaylist'
import { UserContext } from "../context/UserContext";

const Home = () => {
  const { dTk } = useContext(UserContext);
  const [decToken] = dTk;

return (
  <div className="main">
    <Previews />
    {decToken && decToken.id ? 
    <Playlists /> :
    <TemporaryPlaylist/>
    }
    
  </div>
)
}

export default Home