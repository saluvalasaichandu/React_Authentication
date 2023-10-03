import { useState, useRef,useContext } from 'react';

import classes from './AuthForm.module.css';
import AuthContext from '../../store/auth-context';

const AuthForm = () => {
  const emailInputRef=useRef();
  const passwordInputRef=useRef();
 const authCtx= useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const[isLoading,setIsLoading]=useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler=(e)=>{
    e.preventDefault();
    const enteredEmail=emailInputRef.current.value;
    const enteredPassword=passwordInputRef.current.value;
  setIsLoading(true);
  let url;
  if(isLogin){
    url="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCsFOo_OOY5tDEcTUchDnwHGbqkYCBq1ow"
  }
  else{
    url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCsFOo_OOY5tDEcTUchDnwHGbqkYCBq1ow"
  }
  fetch(url,  //add webAPI key from firebase
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
    setIsLoading(false);
    if(res.ok){
      return res.json();
    }
    else{
      //error output
      res.json().then(data=>{
        //console.log(data)
        let errorMessage = "Authentication Failed";
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }
          alert(errorMessage)
          //throw new Error(errorMessage);
      });
    }
  })
  .then((data)=>{
    //console.log(data)
    authCtx.login(data.idToken)
  })
  .catch((err)=>{alert(err.message);})
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
        {isLoading && <p>Sending Request...</p>}
        {!isLoading &&
        <button type="submit">
              {isLogin ? "Login" : "Create Account"}
            </button>}
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
