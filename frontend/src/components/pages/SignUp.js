import React from 'react';
import '../../App.css';
import { useEffect } from 'react';
import jwt_decode from 'jwt-decode';




 function SignUp() {

    // const [user,setUser] = useState({});

function handleCallbackResponse(response){
    console.log("Encoded JWT ID token :" + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    // setUser(userObject);
}

useEffect(()=>{
  /*global google*/
  google.accounts.id.initialize({
    client_id:"802699845079-f88eqoj2naua7selgj0g5dg8vfjm3or5.apps.googleusercontent.com",
    callback: handleCallbackResponse
    // hosted_domain:'itbhu.ac.in'
  });
  google.accounts.id.renderButton(
    document.getElementById("signInDiv"),
    {theme: "outline",size:"large"}
  );
  google.accounts.id.prompt();
},[]);

  return (
    <div id='signInDiv'>googleLogin</div>
  )
}
export default SignUp;
