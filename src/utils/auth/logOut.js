export const logOut = async () => {
    try {
        if (process.env.REACT_APP_API_URL) {
            const respJSON = await fetch (`${process.env.REACT_APP_API_URL}api/logout`, {
                method: "POST",
                credentials: "include"
            })
            const respOBJ = await respJSON.json();
            return respOBJ;
        } else {
            return ({
                success: false, 
                message: "No se encontró la variable de entorno: REACT_APP_API_URL", 
            });
        }
    } catch (err) {
        return ({
            success: false, 
            message: `Error de deslogueo: ${err.message}`
        }); 
    }
}
