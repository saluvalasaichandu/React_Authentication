
import { useContext, useRef } from "react";
import classes from "./ProfileForm.module.css";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
const ProfileForm = () => {
  const history=useHistory();
  const passwordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const formSubmitHandler = (e) => {
    e.preventDefault();
    const enteredNewPassword = passwordInputRef.current.value;
    fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCsFOo_OOY5tDEcTUchDnwHGbqkYCBq1ow",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      console.log(res);
      history.replace('/');
    });
  };
  return (
    <form className={classes.form} onSubmit={formSubmitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={passwordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;