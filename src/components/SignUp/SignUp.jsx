import { Switch, Route } from 'react-router-dom';
import UserRegister from './SignUpUser'
import SignUpCreator from './SignUpCreator'

const SignUp = () => {
  return (
    <div className="main-container">
      <Switch>
        <Route path='/signUp/user'><UserRegister /></Route>
        <Route path='/signUp/creator'><SignUpCreator /></Route>
      </Switch>
    </div>
  )
}

export default SignUp