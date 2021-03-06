import { Fragment, useState } from 'react';

import { Link } from 'react-router-dom';

import * as Fa from 'react-icons/fa';

import Navbar from './Navbar';
import SideDrawer from './SideDrawer';
import BackDrop from '../UI/BackDrop';

import './MainNavigation.css';

function MainNavigation(props) {
  console.log('MainNavigation');
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openSideDrawer = () => {
    setDrawerIsOpen(true);
  };

  const closeSideDrawer = () => {
    setDrawerIsOpen(false);
  };
  return (
    <Fragment>
      {drawerIsOpen && <BackDrop onClick={closeSideDrawer} />}

      <SideDrawer closeSideDrawer={closeSideDrawer} show={drawerIsOpen} />

      <header className='main-navigation'>
        <Fa.FaBars className='main-navigation__bar' onClick={openSideDrawer} />
        <div className='main-navigation__logo'>
          <h1>
            <Link to='/events'>BookEvents</Link>
          </h1>
        </div>
        <Navbar />
      </header>
    </Fragment>
  );
}

export default MainNavigation;
