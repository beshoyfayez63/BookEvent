import { Fragment, useState } from 'react';

import { Link } from 'react-router-dom';

import * as Fa from 'react-icons/fa';

import Navbar from './Navbar';
import SideDrawer from './SideDrawer';
import BackDrop from '../UI/BackDrop';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { token, logout } from '../../store/user/user-slice';

import './MainNavigation.css';

function MainNavigation(props) {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  // REDUX
  const dispatch = useDispatch();

  const userToken = useSelector(token);

  const openSideDrawer = () => {
    setDrawerIsOpen(true);
  };

  const closeSideDrawer = () => {
    setDrawerIsOpen(false);
  };
  return (
    <Fragment>
      {drawerIsOpen && <BackDrop onClick={closeSideDrawer} />}

      <SideDrawer
        closeSideDrawer={closeSideDrawer}
        show={drawerIsOpen}
        token={userToken}
      />

      <header className='main-navigation'>
        <Fa.FaBars className='main-navigation__bar' onClick={openSideDrawer} />
        <div className='main-navigation__logo'>
          <h1>
            <Link to='/events'>BookEvents</Link>
          </h1>
        </div>
        <Navbar token={userToken} logout={() => dispatch(logout())} />
      </header>
    </Fragment>
  );
}

export default MainNavigation;
