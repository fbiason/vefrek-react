import Swal from "sweetalert2";

const swalPopUp = (title, text, icon, reloadPage = false) => {
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
        confirmButtonColor: '#71706f',
        color: '#71706f',       
        scrollbarPadding: false,     
        customClass: {      
            confirmButton: 'sweetConfirmBoton',        
        },
    })                                                                                                    
}

export {swalPopUp};