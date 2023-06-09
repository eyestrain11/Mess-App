import React from 'react';
import '../App.css';
import {Login_Button} from './Login_Button';
import { Logout_Button } from './Logout_Button';
import { Button } from './Button';
import './HeroSection.css';
import useAuth from '../Auth/useAuth';

function HeroSection() {
  const { auth } = useAuth();
  return (
    <div className='hero-container'>
      <video src='/videos/video-3.mp4' autoPlay loop muted />
      <h1>MESS COMPANION</h1>
      <p>What do you identify as?</p>

      {auth.role===0 ?
        (<div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          path="/user/profile"
        >
          STUDENT   <i class='fas fa-school' />
        </Button>
        <Logout_Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={console.log('hey')}
        >
          MESS STAFF <i class='fas fa-bread-slice' />
        </Logout_Button>
      </div>)
        :
        auth.role===1 ?
        (<div className='hero-btns'>
        <Logout_Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          STUDENT   <i class='fas fa-school' />
        </Logout_Button>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          path="/admin/home"
        >
          MESS STAFF <i class='fas fa-bread-slice' />
        </Button>
      </div>)
        :
        (<div className='hero-btns'>
        <Login_Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          STUDENT   <i class='fas fa-school' />
        </Login_Button>
        <Login_Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
        >
          MESS STAFF <i class='fas fa-bread-slice' />
        </Login_Button>
      </div>)}

      {/* <div className='hero-btns'>
        <Login_Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          STUDENT   <i class='fas fa-school' />
        </Login_Button>
        <Login_Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={console.log('hey')}
        >
          MESS STAFF <i class='fas fa-bread-slice' />
        </Login_Button>
      </div> */}
    </div>
  );
}

export default HeroSection;
