import musicApi from "../musicApi"


const urlRegister = '/auth/register'
const urlLogin = '/auth/login'
const urlToken = '/auth/validarToken'
const urlUpdateImgProcfile = '/auth/updateImgProcfile'
const urlUpdateProcfile = '/auth/updateProcfile'
const urlcancelImg = '/auth/cancelImg'


const registerWithEmailAndPassword = async(data) => {

    try {
        const res = await musicApi.post(urlRegister, data);
        return{
            ok:true,
            data:res.data
        }

    } catch (error) {
        return{
            ok:false,
            error:error.response.data
        }
    }
}


 const loginWithEmailAndPassword = async({correo, password}) => {

    try{
        const res = await musicApi.post(urlLogin, {correo, password});
        return {
            ok:true,
            data:res.data
        }
    }
    catch(error){
        return {
            ok:false,
            error:error.response.data
        }
    }
  }


const verifyToken = async() => {
    const token = localStorage.getItem('token');

    if(!token){
      return  {
        ok:false,
        msg:'No existe Token'
      }
    }

    try {
        const res = await musicApi.get(urlToken);
        return {
            ok:true,
            data:res.data.usuario
        }

    } catch (error) {
        console.log(error)
        return {
            ok:false,
            error:error.response.data
        }
    }
    
  }


  const updateProcfile = async({nombre, id, img}) => {

    try {
        const res = await musicApi.put(`${urlUpdateProcfile}/${id}`, {nombre, img});
        return{
            ok:true,
            nombre:res.data.usuario.nombre,
            img:res.data.usuario.img,
        }

    } catch (error) {
        console.log(error)
        return {
            ok:false,
            data:error.response.data
        }
    }

  }


  const updateImgProcfile = async(data) => {

    const headers = {
        'Content-Type':'multipart/form-data',
    };

    try {
        const res = await musicApi.put(urlUpdateImgProcfile, data, {headers});

        return {
            ok:true,
            img:res.data.img
        }
    } catch (error) {
        console.log(error)
        return {
            ok:false
        }
    }
  }

  const cancelImgProcFile = async({id, img}) => {
    try {
        await musicApi.put(urlcancelImg, {id, img})
        return {
            ok:true
        }
    } catch (error) {
        console.log(error)
        return {
            ok:false
        }
    }
  }


export {
    registerWithEmailAndPassword,
    loginWithEmailAndPassword,
    verifyToken,
    updateProcfile,
    updateImgProcfile,
    cancelImgProcFile
}