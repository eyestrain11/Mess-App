import {React, useContext} from 'react';
import './Button.css';
import LoginContext from './LoginModal';

const STYLES = ['btn--primary', 'btn--outline', 'btn--test'];

const SIZES = ['btn--medium', 'btn--large'];

export const Login_Button = ({
  children,
  type,
  buttonStyle,
  buttonSize,
}) => {
  const {setLoginmodal} = useContext(LoginContext);
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  const change = () => {
    setLoginmodal(true);
  };

  return (
    <navbar className='btn-mobile'>
      <button
        className={`btn ${checkButtonStyle} ${checkButtonSize}`}
        onClick = {() => change()}
        type={type}
      >
        {children}
      </button>
    </navbar>
  );
};
