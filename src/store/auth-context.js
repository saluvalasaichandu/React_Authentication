// to make it global to give access to header and every component instead of redux we use context to avoid downloading the redux package
import React, { useState } from "react"
const AuthContext=React.createContext({
    token:'',
    isLoggedIn:'false',
    login:(token)=>{},
    logout:()=>{}
});
export const AuthContextProvider=(props)=>{
    const[token,setToken]=useState(null);
    const userIsLoggedIn=!!token;     //if no token it will return false.

    const loginHandler=(token)=>{
        setToken(token);
    }
    const logoutHandler=()=>{
        setToken(null);
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