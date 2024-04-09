export const updateUser = async (userData) => {

    try {
        const responseJSON = await fetch(`${process.env.REACT_APP_API_URL}api/updateuser`, {
            method: 'put',
            body: userData,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
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
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        });
        const responseOBJ = await responseJSON.json();
        return responseOBJ.success ? { success: true, userData: responseOBJ.userData, message: responseOBJ.message } : { success: false, message: responseOBJ.message };
    } catch (error) {
        return { success: false, message: error.message }
    }
}

/********************* PARA PODER USAR ESTE ENDPOINT SI O SI HAY QUE ENVIAR EN LA QUERY DE BUSQUEDA EL EMAIL DEL USUARIO A EDITAR *****************************/
export const editUserByQuery = async (queryOBJ, dataOBJ) => {
    try {
        const queryJSON = JSON.stringify(queryOBJ);
        const dataJSON = JSON.stringify(dataOBJ);
        const responseJSON = await fetch(`${process.env.REACT_APP_API_URL}api/edituser?query=${queryJSON}&data=${dataJSON}`, {
            method: 'get',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        });
        const responseOBJ = await responseJSON.json();
        return responseOBJ.success ? { success: true, message: responseOBJ.message } : { success: false, message: responseOBJ.message };
    } catch (error) {
        return { success: false, message: error.message }
    }
}


/************************************** Empresa *************************************/

export const findCompany = async (field, value, fieldsSelected) => {

    try {
        const responseJSON = await fetch(`${process.env.REACT_APP_API_URL}api/findcompany?field=${field}&value=${value}&fieldsSelected=${fieldsSelected}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            },
        });
        const responseOBJ = await responseJSON.json();
        return responseOBJ;
    } catch (error) {
        return { success: false, message: error.message }
    }
}

export const findCompanys = async (matchJSON, aggregateQueryJSON) => {

    try {
        const responseJSON = await fetch(`${process.env.REACT_APP_API_URL}api/findcompanys?match=${matchJSON}&aggregateQuery=${aggregateQueryJSON}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            },
        });
        const responseOBJ = await responseJSON.json();
        return responseOBJ;
    } catch (error) {
        return { success: false, message: error.message }
    }
}


export const findCompanys2 = async (queryJSON, fieldsSlected) => {

    try {
        const responseJSON = await fetch(`${process.env.REACT_APP_API_URL}api/findcompanys2?query=${queryJSON}&fieldsSelected=${fieldsSlected}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            },
        });
        const responseOBJ = await responseJSON.json();
        return responseOBJ;
    } catch (error) {
        return { success: false, message: error.message }
    }
}

export const handleFavorite = async (companyId, userEmail, option) => {

    try {
        const responseJSON = await fetch(`${process.env.REACT_APP_API_URL}api/handlefavorite?companyId=${companyId}&userEmail=${userEmail}&option=${option}`, {
            method: 'put',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        });
        const responseOBJ = await responseJSON.json();
        return responseOBJ;
    } catch (error) {
        return { success: false, message: error.message }
    }
}

export const addCompany = async (companyData) => {

    try {
        const responseJSON = await fetch(`${process.env.REACT_APP_API_URL}api/addcompany`, {
            method: 'post',
            body: companyData,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        });
        const responseOBJ = await responseJSON.json();
        return responseOBJ.success ? { success: true, message: responseOBJ.message } : { success: false, message: responseOBJ.message };
    } catch (error) {
        return { success: false, message: error.message }
    }
}

export const updateCompany = async (id, companyData) => {

    try {
        const responseJSON = await fetch(`${process.env.REACT_APP_API_URL}api/updatecompany?id=${id}`, {
            method: 'put',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            },
            body: companyData,
        });
        const responseOBJ = await responseJSON.json();
        return responseOBJ.success ? { success: true, message: responseOBJ.message } : { success: false, message: responseOBJ.message };
    } catch (error) {
        return { success: false, message: error.message }
    }
}

export const deleteImageOfFirebase = async (deletePath) => {
    const responseJSON = await fetch(`${process.env.REACT_APP_API_URL}api/deleteimage?delete=${deletePath}`, {
        method: 'delete',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
    });
    const responseOBJ = await responseJSON.json();
    return responseOBJ;
}

export const deleteCompanyById = async (id) => {
    const responseJSON = await fetch(`${process.env.REACT_APP_API_URL}api/deletecompany?id=${id}`, {
        method: 'delete',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
    });
    const responseOBJ = await responseJSON.json();
    return responseOBJ;
}

export const updateCompanyState = async (id, newState) => {
    const responseJSON = await fetch(`${process.env.REACT_APP_API_URL}api/updatecompanystate?id=${id}&newstate=${JSON.stringify(newState)}`, {
        method: 'put',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
    });
    const responseOBJ = await responseJSON.json();
    return responseOBJ;
}

export const addReview = async (numberOfStars, companyId, comment) => {
    const responseJSON = await fetch(`${process.env.REACT_APP_API_URL}api/reviews`, {
        method: 'post',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ numberOfStars, companyId, comment }),
    });
    const responseOBJ = await responseJSON.json();
    return responseOBJ;
}

