import { createContext, useState } from 'react';
import { Spinner } from '../components/spinner/Spinner';

const SpinnerContext = createContext ();

const SpinnerProvider = ({children}) => {
    
    const [spinner, setSpinner] = useState ();
           
    const showSpinner = (opc) => opc ? setSpinner(<Spinner/>) : setSpinner();
                  
    return (      
        <SpinnerContext.Provider value={{showSpinner, spinner}}>
            {children}
        </SpinnerContext.Provider>
    );
}

export { SpinnerContext, SpinnerProvider };
