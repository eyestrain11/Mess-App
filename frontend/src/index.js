import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './Auth/AuthProvider';
import { LoginProvider } from './components/LoginModal';

ReactDOM.render(
    <LoginProvider>
        <AuthProvider>
            <App/>
        </AuthProvider>
    </LoginProvider>
    , document.getElementById('root'));
