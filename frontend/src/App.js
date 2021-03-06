import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

// COMPONENTS
import Auth from './pages/Auth';
import Bookings from './pages/Bookings';
import Events from './pages/Events';
import MainNavigation from './components/Navigation/MainNavigation';

import './App.css';

function App() {
  return (
    <Router>
      <MainNavigation />
      <main className='main-content'>
        <Switch>
          <Redirect from='/' to='/auth' exact />
          <Route path='/auth' exact>
            <Auth />
          </Route>
          <Route path='/events' exact>
            <Events />
          </Route>
          <Route path='/bookings' exact>
            <Bookings />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
