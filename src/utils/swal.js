import Swal from "sweetalert2";

const swalPopUp = (title, text, icon) => {
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
        confirmButtonColor: '#71706f',
        color: '#71706f',       
        scrollbarPadding: false,     
        allowOutsideClick: false,   
        customClass: {      
            confirmButton: 'sweetConfirmBoton',        
        },
    }).then((result) => {
        if (result.isConfirmed && text === "Tienes que registrarte: Sesión Finalizada") {
            window.location.href = "";   
        }
    })                                                                                                    
}

export const swalPopUpWhitOptionsAndCallback = (
    mainIcon,
    text,
    textBConfirm,
    textBcancel,

    showPopUpConfirmed = false,
    textPopUpConfirmed = "",
    typeIconConfirmed = "",
    callBackConfirmed = null,

    showPopUpCancel = false,
    textPopUpCancel = "",
    typeIconCancel = "",
    callBackCancel = null,
) => {
    Swal.fire({
        icon: mainIcon,
        text: text,
        showDenyButton: textBcancel ? true : false,
        showCancelButton: false,
        confirmButtonText: textBConfirm,
        denyButtonText: textBcancel,
        scrollbarPadding: false,
        allowOutsideClick: false,
        customClass: {
            title: 'sweetTitleWithOptions',
            denyButton: "sweetCancelButtonWithOptions",
            confirmButton: "sweetConfirmButtonWithOptions",
        }
    }).then((result) => {
        if (result.isConfirmed) {
            if (showPopUpConfirmed) Swal.fire(textPopUpConfirmed, '', typeIconConfirmed || "warning")
            if (callBackConfirmed) callBackConfirmed();
        } else if (result.isDenied) {
            if (showPopUpCancel) Swal.fire(textPopUpCancel, '', typeIconCancel || "warning");
            if (callBackCancel) callBackCancel();
        }
    })
    document.body.style.overflow = "visible";                    //Para que no desaparezca el scroll con el popup y no se mueva la imagen
}

export { swalPopUp };