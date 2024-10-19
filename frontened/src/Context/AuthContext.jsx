import { useContext , createContext, useState } from "react";

export const AuthContext = createContext();

export const useAuth = ()=>{
    return useContext(AuthContext)
}

export const AuthContextProvider=({children})=>{
    const [authUser , setAuthUser] = useState(JSON.parse(localStorage.getItem('CHAT APP')) || null);

    return <AuthContext.Provider value={{authUser,setAuthUser}}>
          {children}
    </AuthContext.Provider>
}