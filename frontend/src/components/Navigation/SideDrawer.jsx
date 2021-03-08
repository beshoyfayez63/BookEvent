import * as Fa from 'react-icons/fa';
import { CSSTransition } from 'react-transition-group';

import NavigationLink from './NavigationLink';

import './SideDrawer.css';

function SideDrawer(props) {
  return (
    <CSSTransition
      in={props.show}
      timeout={5000}
      classNames='slide-in-left'
      mountOnEnter
      unmountOnExit
    >
      <aside className='sidedrawer'>
        <div className='sidedrawer__close'>
          <Fa.FaTimes
            size='20'
            cursor='pointer'
            color='#5101d1'
            onClick={props.closeSideDrawer}
          />
        </div>
        <ul>
          {!props.token && (
            <NavigationLink
              onClick={props.closeSideDrawer}
              link='/auth'
              content='Authantication'
            />
          )}
          <NavigationLink
            onClick={props.closeSideDrawer}
            link='/events'
            content='Events'
          />
          {props.token && (
            <NavigationLink
              onClick={props.closeSideDrawer}
              link='/bookings'
              content='Bookings'
            />
          )}
        </ul>
      </aside>
    </CSSTransition>
  );
}

export default SideDrawer;
