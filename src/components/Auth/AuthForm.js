import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const emailInputRef=useRef();
  const passwordInputRef=useRef();
  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler=(e)=>{
    e.preventDefault();
    const enteredEmail=emailInputRef.current.value;
    const enteredPassword=passwordInputRef.current.value;
  
  if(isLogin){
  }
  else{
    fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCsFOo_OOY5tDEcTUchDnwHGbqkYCBq1ow",  //add webAPI key from firebase
    {
      method:"POST",
      body:JSON.stringify({        //converts into Json objects
        email:enteredEmail,
        password:enteredPassword,
        returnSecureToken:true
      }),
      headers:{
        'content-type':'application/json'}

    }).then(res=>{
      if(res.ok){

      }
      else{
        //error output
        res.json().then(data=>{
          console.log(data)
        });
      }
    })
  }
};
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
        <button type="submit">
              {isLogin ? "Login" : "Create Account"}
            </button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
