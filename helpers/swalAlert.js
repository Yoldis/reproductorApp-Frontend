import Swal from "sweetalert2"



export const swal = (icon, msg) => {
     Swal.fire({
         icon,
         position: 'center',
         showConfirmButton: false,
         title: msg,
         background: "#141414",
         timer: 1200,
         color: "#fff",
    })
}


export const swartAlert = async(titleReq, text = "Los cambios seran irreversibles!", textBtnEliminar = 'Si, Eliminar!') => {

    const {isConfirmed} = await Swal.fire({
        title: titleReq,
        text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#f97316',
        cancelButtonColor: '#d33',
        confirmButtonText: textBtnEliminar,
        background: "#141414",
        color: "#fff",
      });

      return isConfirmed;
}



