import { Fragment, useEffect, useCallback } from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';

// COMPONENTS
import Auth from './pages/Auth';
import Bookings from './pages/Bookings';
import Events from './pages/Events';
import MainNavigation from './components/Navigation/MainNavigation';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { checkAuthState } from './store/user/user-slice';
import { getDataLocalStorage } from './util/helper';

import './App.css';

function App() {
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.user.userData.token);
  const userToken2 = getDataLocalStorage().token;
  const checkAuthTimeOut = useCallback(() => dispatch(checkAuthState()), [
    dispatch,
  ]);

  useEffect(() => {
    checkAuthTimeOut();
  }, [checkAuthTimeOut]);

  return (
    <Fragment>
      <MainNavigation />
      <main className='main-content'>
        <Switch>
          {(userToken || userToken2) && (
            <Redirect from='/auth' to='/events' exact />
          )}
          {!(userToken || userToken2) && (
            <Route path='/auth' exact>
              <Auth />
            </Route>
          )}
          <Route path='/events' exact>
            <Events />
          </Route>
          {(userToken || userToken2) && (
            <Route path='/bookings' exact>
              <Bookings />
            </Route>
          )}
          {!(userToken || userToken2) && <Redirect to='/auth' exact />}
        </Switch>
      </main>
    </Fragment>
  );
}

export default App;
