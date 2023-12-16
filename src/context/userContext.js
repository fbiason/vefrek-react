import { createContext, useState } from 'react';

const UserContext = createContext ({userData: {email: "", name: "", isLogged: false }, updateUserData: () => {}});

const UserProvider = ({children}) => {
    const [userData, setUserData] = useState ({email: "", name: "", isLogged: false});
     
    const updateUserData = (userData) => {
        setUserData(userData)
    }    
      
    return (      
        <UserContext.Provider value={{userData, updateUserData}}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };
