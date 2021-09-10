import { Switch, Route } from 'react-router-dom';
import Home from './Home'
import Player from './Player'
import Login from './Login/Login'
import SignUp from './SignUp'
import Profile from './Profile'
import AdminPanel from './AdminPanel/AdminPanel'
import CreatorPanel from './CreatorPanel/CreatorPanel'
import About from './About/About'
import EditVideo from './CreatorPanel/ContentManager/EditVideo'

const LullifyRouter = () => {

  return (
    <div>
      <Switch>
        <Route exact path='/'><Home /></Route>
        <Route path='/player/:id?'><Player/></Route>
        <Route path='/login'><Login /></Route>
        <Route path='/signUp'><SignUp /></Route>
        <Route path='/profile'><Profile /></Route>
        <Route path='/adminpanel'><AdminPanel/></Route>
        <Route exact path='/creatorpanel'><CreatorPanel /></Route>
        <Route path='/creatorpanel/:video_id?'><EditVideo /></Route>
        <Route path='/about'><About /></Route>
      </Switch>
    </div>
  )
}

export default LullifyRouter