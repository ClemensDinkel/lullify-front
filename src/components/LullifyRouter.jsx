import { Switch, Route } from 'react-router-dom';
import Home from './Home'
import Player from './Player'
import Login from './Login'
import Register from './Register'
import Profile from './Profile'
import AdminPanel from './AdminPanel'
import CreatorPanel from './CreatorPanel'
import About from './About'
import EditVideo from './EditVideo'


const LullifyRouter = () => {

  return (
    <div>
      <Switch>
        <Route exact path='/'><Home /></Route>
        <Route path='/player/:id?'><Player/></Route>
        <Route path='/login'><Login /></Route>
        <Route path='/register'><Register /></Route>
        <Route path='/profile'><Profile /></Route>
        <Route path='/adminpanel'><AdminPanel/></Route>
        <Route path='/creatorpanel'><CreatorPanel /></Route>
        <Route path='/video/:video_id?'><EditVideo /></Route>
        <Route path='/about'><About /></Route>
      </Switch>
    </div>
  )
}

export default LullifyRouter