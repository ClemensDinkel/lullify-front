import { Switch, Route } from 'react-router-dom';
import Home from './Home'
import Player from './Player'
import Login from './Login'
import Register from './Register'
import Profile from './Profile'
import AdminPanel from './AdminPanel'
import CreatorPanel from './CreatorPanel'
import About from './About'
import { useState, useEffect } from 'react';
import api from "../api";


const LullifyRouter = ({ setToken, user }) => {


  return (
    <>
      <Switch>
        <Route exact path='/'><Home user={user} /></Route>
        <Route path='/player/:id?'><Player user={user} /></Route>
        <Route path='/login'><Login setToken={setToken} /></Route>
        <Route path='/register'><Register /></Route>
        <Route path='/profile'><Profile user={user} /></Route>
        <Route path='/adminpanel'><AdminPanel user={user} /></Route>
        <Route path='/creatorpanel'><CreatorPanel user={user} /></Route>
        <Route path='/about'><About /></Route>
      </Switch>
    </>
  )
}

export default LullifyRouter