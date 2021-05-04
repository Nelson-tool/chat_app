import { Button } from '@material-ui/core';
import React from 'react'
import { auth, provider } from './firebase';
import "./Login.css" ;
import { useStateProviderValue } from "../StateProvider";
import { actionTypes } from '../reducer';


function Login() {

    const [{}, dispatch] = useStateProviderValue();

    const signIn = () => {
        auth.signInWithPopup(provider)
        .then((result) => {
            dispatch({
              type: actionTypes.SET_USER,
              user: result.user,
            });
          })
          .catch((error) => alert(error.message));
    }

    

    
    
    return<div className= "login ">  
    <div className= "login_container ">
        <img src= "https://swaddle-wkwcb6s.stackpathdns.com/wp-content/uploads/2021/03/CC.jpg"
        alt=""/>
        <div className="login__text">
            <h1>Sign in to LEBRONCHAT</h1>
        </div>

        <Button  onClick={signIn}>
            Sign In with google
        </Button>

    </div>
    </div>
    
}

export default Login
