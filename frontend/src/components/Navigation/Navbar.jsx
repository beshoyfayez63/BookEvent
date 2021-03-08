import { Fragment, memo } from 'react';
import NavigationLink from './NavigationLink';

function Navbar(props) {
  return (
    <nav className='main-navigation__items'>
      <ul>
        {!props.token && (
          <NavigationLink link='/auth' content='Authantication' />
        )}
        <NavigationLink link='/events' content='Events' />
        {props.token && (
          <Fragment>
            <NavigationLink link='/bookings' content='Bookings' />
            <button onClick={props.logout} className='logout'>
              Logout
            </button>
          </Fragment>
        )}
      </ul>
    </nav>
  );
}

export default memo(Navbar);
