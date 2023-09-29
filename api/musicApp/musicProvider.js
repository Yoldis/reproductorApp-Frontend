import musicApi from "../musicApi"


const urlMusic = '/music/';
const urlMusicEliminarTodas = '/music/eliminarTodas/';
const urlMusicActual = '/musicActual/'

const importMusic = async(archivo) => {

    const headers = {
        'Content-Type':'multipart/form-data',
    };

    try{
        const res = await musicApi.post(urlMusic, archivo, {headers});
        return{
            ok:true,
            data:res.data.data
        }
    }
    catch(error){
        console.log(error)
        return {
            ok:false,
            data:error.response.data
        }
    }
}

const getMusic = async(id) => {
    try {
        const res = await musicApi.get(`${urlMusic}${id}`);
        return{
            ok:true,
            data:res.data.data
        }
    } catch (error) {
        console.log(error)
        return {
            ok:false
        }
    }
}


const deleteOneMusic = async(id) => {

    try {
        const res = await musicApi.delete(`${urlMusic}${id}`);
        return{
            ok:true
        }
    } catch (error) {
        console.log(error);
        return {
            ok:false,
            data:error.response.data
        }
    }
}

const deleteAllMusic = async(idUser) => {

    try {
        const res = await musicApi.delete(urlMusicEliminarTodas + idUser);
        return{
            ok:true
        }
    } catch (error) {
        console.log(error)
        return {
            ok:false,
            data:error.response.data
        }
    }
}

const updateMuiscFavorito = async(id) => {
    try{
        const res = await musicApi.put(urlMusic + id);
        return{
            ok:true,
            data:res.data.data
        }
    }catch(error){
        console.log(error)
        return {
            ok:false,
            data:error.response.data
        }
    }
}


const saveInDBMusicActual = async(data) => {

    try{
        await musicApi.post(urlMusicActual, data);
        return {
            ok:true
        }
    }catch(error){
        console.log(error)
        return {
            ok:false
        }
    }
}

const getMusicaActual = async (id) => {

    try{
        const {data} = await musicApi.get(`${urlMusicActual}${id}`);
        return {
            ok:true,
            data:data.data,
            repetir:data.repetir,
            random:data.random,
            minutoActual:data.minutoActual,
        }

    }catch(error){
        console.log(error)
        return{
            ok:false
        }
    }
}

export {
    importMusic,
    getMusic,
    deleteOneMusic,
    deleteAllMusic,
    updateMuiscFavorito,
    saveInDBMusicActual,
    getMusicaActual
}