import React, { useContext, useState } from "react";

const AppContext = React.createContext();
export default function ContextProvider({children}){
    const[userType , setUserType] = useState('Vendor');
    const[userDetails , setUserDetails] = useState('');
    return<AppContext.Provider
        value={{
            userType : userType,
            changeUserType : (type) =>{
                setUserType(type)
            },
            userDetails : userDetails,
            setUserDetails : (data) =>{
                setUserDetails(data)
            }
        }}
    >
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => useContext(AppContext);