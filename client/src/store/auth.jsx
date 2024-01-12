import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({children}) => {

    const [token,setToken] = useState(localStorage.getItem("token"));

    const storeTokenInLS = (serverToken) =>{
        return localStorage.setItem("token",serverToken);
    }

    let isLoggedIn = !!token;

    const logoutUser = () =>{
        setToken("");
        return localStorage.removeItem("token");
    };
    return <AuthContext.Provider value={{storeTokenInLS, logoutUser, isLoggedIn}}>
        {children}
    </AuthContext.Provider>
}
// create our custom hook
export const useAuth = () =>{
    return useContext(AuthContext);
}