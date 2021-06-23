import Previews from './Previews'
import Playlists from './Playlists'

const Home = ({user}) => {

return (
  <div className="main">
    <Previews />
    <Playlists user={user}/>
  </div>
)
}

export default Home