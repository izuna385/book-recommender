import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import TestPage from './pages/TestPage'


const App = () => (
  <BrowserRouter>
    <div>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/login'>About</Link></li>
        <li><Link to='/testpage'>TestPage</Link></li>
      </ul>

      <hr />
      
      <Route exact path='/' component={Home} />
      <Route path='/login' component={Login} />
      <Route path='/testpage' component={TestPage} />
    </div>
  </BrowserRouter>
)


export default App