
import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';


const {VITE_API_URL_MUSIC} = getEnvVariables();

const musicApi = axios.create({
    baseURL:VITE_API_URL_MUSIC
})



musicApi.interceptors.request.use( config => {
    
    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }


    return config;
})


export default musicApi;