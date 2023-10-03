// to make it global to give access to header and every component instead of redux we use context to avoid downloading the redux package
import React, { useState } from "react"
const AuthContext=React.createContext({
    token:'',
    isLoggedIn:'false',
    login:(token)=>{},
    logout:()=>{}
});
export const AuthContextProvider=(props)=>{
    let initialToken = localStorage.getItem("token");
    const[token,setToken]=useState(initialToken);
    const userIsLoggedIn=!!token;     //if no token it will return false.
    
    const loginHandler=(token)=>{
        setToken(token);
        localStorage.setItem('token',token);
    }
    const logoutHandler=()=>{
        setToken(null);
        localStorage.removeItem('token');
    }
    const contextValue={
        token:token,
        isLoggedIn:userIsLoggedIn,
        login:loginHandler,
        logout:logoutHandler
    }

    return(
    <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>)
}
export default AuthContext;