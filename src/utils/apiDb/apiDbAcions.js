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
        return responseOBJ.success ? { success: true, companyData: responseOBJ.userData, message: responseOBJ.message } : { success: false, message: responseOBJ.message };
    } catch (error) {
        return { success: false, message: error.message }
    }
}

export const findCompanys = async (query, fieldsSelected) => {

    try {
        const responseJSON = await fetch(`${process.env.REACT_APP_API_URL}api/findcompanys?query=${query}&fieldsSelected=${fieldsSelected}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            },
        });
        const responseOBJ = await responseJSON.json();
        return responseOBJ.success ? { success: true, companysData: responseOBJ.companysData, message: responseOBJ.message } : { success: false, message: responseOBJ.message };
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

export const updateCompany = async (companyData) => {

    try {
        const responseJSON = await fetch(`${process.env.REACT_APP_API_URL}api/updatecompany`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(companyData),
        });
        const responseOBJ = await responseJSON.json();
        return responseOBJ.success ? { success: true, message: responseOBJ.message } : { success: false, message: responseOBJ.message };
    } catch (error) {
        return { success: false, message: error.message }
    }
}

