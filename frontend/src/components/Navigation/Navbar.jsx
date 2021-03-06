import { memo } from 'react';
import NavigationLink from './NavigationLink';

function Navbar() {
  console.log('Navbar');
  return (
    <nav className='main-navigation__items'>
      <ul>
        <NavigationLink link='/auth' content='Authantication' />
        <NavigationLink link='/events' content='Events' />
        <NavigationLink link='/bookings' content='Bookings' />
      </ul>
    </nav>
  );
}

export default memo(Navbar);
