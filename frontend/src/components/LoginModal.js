import React from 'react';
import {createContext, useState} from 'react';

const LoginContext = createContext(false);

export const LoginProvider = ({children}) => {
    const [loginModal , setLoginmodal] = useState(false);

    return (
        <LoginContext.Provider value={{loginModal , setLoginmodal}}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginContext;