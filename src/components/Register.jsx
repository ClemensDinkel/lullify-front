import { Switch, Route } from 'react-router-dom';
import UserRegister from './UserRegister'
import CreatorRegister from './CreatorRegister'

const Register = () => {
    return (
        <>
            <Switch>
            <Route path='/register/userRegister'><UserRegister/></Route>
            <Route path='/register/creatorRegister'><CreatorRegister/></Route>
            </Switch>
            
        </>
    )
}

export default Register