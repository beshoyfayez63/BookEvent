import * as Fa from 'react-icons/fa';
import { CSSTransition } from 'react-transition-group';

import NavigationLink from './NavigationLink';

import './SideDrawer.css';

function SideDrawer(props) {
  // console.log('SideDrawer');
  return (
    <CSSTransition
      in={props.show}
      timeout={900}
      classNames='slide-in-left'
      mountOnEnter
      unmountOnExit
    >
      <aside className='sidedrawer'>
        <div className='sidedrawer__close'>
          <Fa.FaTimes
            size='20'
            cursor='pointer'
            onClick={props.closeSideDrawer}
          />
        </div>
        <ul>
          <NavigationLink link='/auth' content='Authantication' />
          <NavigationLink link='/events' content='Events' />
          <NavigationLink link='/bookings' content='Bookings' />
        </ul>
      </aside>
    </CSSTransition>
  );
}

export default SideDrawer;
