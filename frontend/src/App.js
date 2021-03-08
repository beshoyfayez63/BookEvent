import { useEffect } from 'react';

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

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { token, checkAuthState } from './store/user/user-slice';

import './App.css';

function App() {
  const dispatch = useDispatch();
  const userToken = useSelector(token);

  useEffect(() => {
    dispatch(checkAuthState());
  }, [dispatch]);

  return (
    <Router>
      <MainNavigation />
      <main className='main-content'>
        <Switch>
          {userToken && <Redirect from='/auth' to='/events' exact />}
          {!userToken && (
            <Route path='/auth' exact>
              <Auth />
            </Route>
          )}
          <Route path='/events' exact>
            <Events />
          </Route>
          {userToken && (
            <Route path='/bookings' exact>
              <Bookings />
            </Route>
          )}
          {!userToken && <Redirect to='/auth' exact />}
        </Switch>
      </main>
    </Router>
  );
}

export default App;
