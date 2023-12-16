export const isLogged = async () => {
    try {
        if (process.env.REACT_APP_API_URL) {
            const respJSON = await fetch(`${process.env.REACT_APP_API_URL}api/islogged`, {
                method: "GET",
                credentials: "include",
            })
            const respOBJ = await respJSON.json();
            if (respOBJ.userData) {
                return ({
                    success: true, 
                    message: "Datos de login recuperados correctamente", 
                    userData: { 
                        email: respOBJ.userData.email,             //El "!" indica que estamos seguros que los datos no son undefined
                        name: respOBJ.userData.name, 
                        isLogged: respOBJ.userData.isLogged,  
                    }}
                );
            } else {
                return ({
                    success: false, 
                    message: respOBJ.message, 
                });
            }
        } else {
            return ({
                success: false, 
                message: "No se encontró la variable de entorno: REACT_APP_API_URL", 
            });
        }
    } catch (err) {
        return ({
            success: false, 
            message: `Error al obtener datos de login: ${err instanceof Error ? err.message : `Error al obtener datos de login: Problema desconocido`}`
        }); //Si err es de tipo Error retornamos su mensaje
    }
}