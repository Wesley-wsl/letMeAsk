import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Home } from './pages/Home'
import { NewRoom } from './pages/NewRoom'
import { Room } from './pages/Room'
import { AuthContextProvider } from './contexts/AuthContext'
import { AdminRoom } from './pages/AdminRoom'



function App() {
  return (
    <div>

      <BrowserRouter>
        <AuthContextProvider>
          <Switch>
            <Route path='/' exact component={Home}></Route>
            <Route path='/rooms/new' exact component={NewRoom}></Route>
            <Route path='/rooms/:id' component={Room}></Route>
            <Route path='/admin/rooms/:id' component={AdminRoom}></Route>
          </Switch>

        </AuthContextProvider>

      </BrowserRouter>

    </div>

  );
}

export default App;
