export const reportCompany = async (reportData) => {
    try {
        const responseJSON = await fetch(`${process.env.REACT_APP_API_URL}api/report`, {
            method: 'POST',
            body: JSON.stringify({reportData: reportData}),
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }
        });
        const responseOBJ = await responseJSON.json();
        return responseOBJ.success ? { success: true, message: responseOBJ.message } : { success: false, message: responseOBJ.message };
    } catch (error) {
        return { success: false, message: error.message }
    }
}