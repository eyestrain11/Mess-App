import React, { useState, useEffect, useContext } from 'react';
import {Login_Button} from './Login_Button';
import {Logout_Button} from './Logout_Button';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import './Navbar.css';
import useAuth from '../Auth/useAuth';
import useLogout from '../API/Logout';
import LoginContext from './LoginModal';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const { auth } = useAuth();
  const logout = useLogout();
  
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const { loginModal, setLoginmodal }= useContext(LoginContext);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
    {auth.role===0 ?
    (<>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            MessC
            <i className='fab fa-typo3' />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/user/profile' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link
                to='/'
                className='nav-links-mobile'
                onClick={logout}
              >
                Logout
              </Link>
            </li>
          </ul>
          {button && <Logout_Button buttonStyle='btn--outline' >Logout</Logout_Button>}
          {loginModal ? <Modal /> : ""}
        </div>
      </nav>
    </>)
    : auth.role===1 ?
    (<>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            MessC
            <i className='fab fa-typo3' />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/admin/home' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link
                to='/'
                className='nav-links-mobile'
                onClick={logout}
              >
                Logout
              </Link>
            </li>
          </ul>
          {button && <Logout_Button buttonStyle='btn--outline' >Logout</Logout_Button>}
          {loginModal ? <Modal /> : ""}
        </div>
      </nav>
    </>)
    :
    (<>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            MessC
            <i className='fab fa-typo3' />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            {/* <li className='nav-item'>
              <Link
                to='/services'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                User
              </Link>
            </li> */}
            {/* <li className='nav-item'>
              <Link
                to='/products'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Admin
              </Link>
            </li> */}
            <li>
              <Link
                to='/'
                className='nav-links-mobile'
                onClick={() => setLoginmodal(true)}
              >
                Login
              </Link>
            </li>
          </ul>
          {button && <Login_Button buttonStyle='btn--outline' >Login</Login_Button>}
          {loginModal ? <Modal /> : ""}
        </div>
      </nav>
    </>)}
    </>
  );
}

export default Navbar;
