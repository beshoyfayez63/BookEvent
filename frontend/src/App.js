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

import './App.css';

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
