import { createContext, useState, useEffect } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import { auth, firebase } from './services/firebase'

import { Home } from './pages/Home'
import { NewRoom } from './pages/NewRoom'

import { AuthContextProvider } from './contexts/AuthContext'



function App() {



  return (
    <div>

      <BrowserRouter>
        <AuthContextProvider>
          <Route path='/' exact component={Home}></Route>
          <Route path='/rooms/new' component={NewRoom}></Route>
        </AuthContextProvider>

      </BrowserRouter>

    </div>

  );
}

export default App;
