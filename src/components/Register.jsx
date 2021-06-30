import { Switch, Route } from 'react-router-dom';
import UserRegister from './UserRegister'
import CreatorRegister from './CreatorRegister'

const Register = () => {
    return (
      <div className="main-container">
            <Switch>
            <Route path='/register/userRegister'><UserRegister/></Route>
            <Route path='/register/creatorRegister'><CreatorRegister/></Route>
            </Switch>
            
        </div>
    )
}

export default Register