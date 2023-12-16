export const logOut = async () => {
    try {
        if (process.env.REACT_APP_API_URL) {
            const response = await fetch (`${process.env.REACT_APP_API_URL}api/logout`, {
                method: "POST",
                credentials: "include"
            })
            const respOBJ = await response.json();
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
            message: `Error de deslogueo: ${err instanceof Error ? err.message : `Error de deslogueo: Problema desconocido`}`
        }); 
    }
}

