import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import TestPage from './pages/TestPage'

const App = () => (
  <BrowserRouter>
    <div>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/login'>Login</Link></li>
        <li><Link to='/signup'>signup</Link></li>
        <li><Link to='/testpage'>TestPage</Link></li>
      </ul>
      <hr />
      
      <Route exact path='/' component={Home} />
      <Route path='/login' component={Login} />
      <Route path='/signup' component={SignUp} />
      <Route path='/testpage' component={TestPage} />
    </div>
  </BrowserRouter>

)


export default App