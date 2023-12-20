export const updateUser = async (userData) => {

    try {
        const responseJSON = await fetch(`${process.env.REACT_APP_API_URL}api/updateuser`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData),
            credentials: "include"
        });
        const responseOBJ = await responseJSON.json();
        return responseOBJ.success ? { success: true, message: responseOBJ.message } : { success: false, message: responseOBJ.message };
    } catch (error) {
        return { success: false, message: error.message }
    }
}

export const findUser = async (field, value, fieldsSelected) => {

    try {
        const responseJSON = await fetch(`${process.env.REACT_APP_API_URL}api/finduser?field=${field}&value=${value}&fieldsSelected=${fieldsSelected}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include"
        });
        const responseOBJ = await responseJSON.json();
        return responseOBJ.success ? { success: true, userData: responseOBJ.userData, message: responseOBJ.message } : { success: false, message: responseOBJ.message };
    } catch (error) {
        return { success: false, message: error.message }
    }
}