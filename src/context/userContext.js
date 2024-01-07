import { createContext, useState } from 'react';

const UserContext = createContext ();

const UserProvider = ({children}) => {
    
    const [userData, setUserData] = useState ({email: "", name: "", isLogged: false});
    const [show, setShow] = useState(false);

    const updateUserData = (userData) => {
        setUserData(userData);
    }    
                
    return (      
        <UserContext.Provider value={{userData, updateUserData, setShow, show}}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };
